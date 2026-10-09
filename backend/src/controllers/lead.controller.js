import Lead from '../models/Lead.js';
import { uploadToCloudinary } from '../config/cloudinary.js';

/**
 * @desc    Submit a new customer lead / assessment inquiry
 * @route   POST /api/leads
 * @access  Public
 */
export const createLead = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      suburb,
      service,
      consultType,
      message,
      referenceId,
      sourcePage,
      fileName,
      fileData, // optional base64
      fileUrl
    } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and phone number are required.'
      });
    }

    let uploadedFileUrl = fileUrl || '';

    // If customer uploaded a base64 file, save it to Cloudinary in 'sunny-solar/bills'
    if (fileData && !uploadedFileUrl) {
      try {
        const uploadResult = await uploadToCloudinary(fileData, 'sunny-solar/customer-bills');
        uploadedFileUrl = uploadResult?.url || '';
      } catch (uploadErr) {
        console.warn('Lead file upload failed (continuing lead creation):', uploadErr.message);
      }
    }

    const lead = await Lead.create({
      name,
      email,
      phone,
      suburb: suburb || '',
      service: service || 'General Solar Inquiry',
      consultType: consultType || '',
      message: message || '',
      referenceId: referenceId || `QLD-${Math.floor(100000 + Math.random() * 900000)}`,
      fileName: fileName || '',
      fileUrl: uploadedFileUrl,
      sourcePage: sourcePage || 'Free Assessment Form',
      status: 'new'
    });

    res.status(201).json({
      success: true,
      message: 'Assessment request recorded successfully',
      data: {
        id: lead._id,
        referenceId: lead.referenceId,
        fileUrl: lead.fileUrl
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all leads (Admin)
 * @route   GET /api/leads
 * @access  Private/Admin
 */
export const getLeads = async (req, res, next) => {
  try {
    const { status, search, page = 1, limit = 50 } = req.query;
    const query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { suburb: { $regex: search, $options: 'i' } },
        { referenceId: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Lead.countDocuments(query);
    const leads = await Lead.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({
      success: true,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      data: leads
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update lead status (Admin)
 * @route   PATCH /api/leads/:id/status
 * @access  Private/Admin
 */
export const updateLeadStatus = async (req, res, next) => {
  try {
    const { status, notes } = req.body;
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }

    if (status) lead.status = status;
    if (notes !== undefined) lead.notes = notes;

    await lead.save();

    res.json({
      success: true,
      message: 'Lead updated successfully',
      data: lead
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a lead (Admin)
 * @route   DELETE /api/leads/:id
 * @access  Private/Admin
 */
export const deleteLead = async (req, res, next) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }

    res.json({
      success: true,
      message: 'Lead deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
