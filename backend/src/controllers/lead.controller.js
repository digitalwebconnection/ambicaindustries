import Lead from '../models/Lead.js';
import { uploadToCloudinary } from '../config/cloudinary.js';
import { detectCountryFromRequest } from '../utils/viewTracker.js';

/**
 * @desc    Submit a new customer lead / assessment inquiry
 * @route   POST /api/leads
 * @access  Public
 */
export const createLead = async (req, res, next) => {
  try {
    const {
      name,
      fullName,
      company,
      email,
      phone,
      city,
      country,
      suburb,
      service,
      consultType,
      message,
      referenceId,
      sourcePage,
      fileName,
      fileData, // optional base64
      fileUrl,
      ip: bodyIp
    } = req.body;

    const leadName = (name || fullName || '').trim();
    const leadEmail = (email || '').trim();
    const leadPhone = (phone || '').trim();

    if (!leadName || !leadEmail || !leadPhone) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and phone number are required.'
      });
    }

    // Capture visitor IP address
    let clientIp =
      req.headers['cf-connecting-ip'] ||
      req.headers['x-real-ip'] ||
      req.headers['x-forwarded-for']?.split(',')[0].trim() ||
      req.socket?.remoteAddress ||
      req.ip ||
      bodyIp ||
      '';

    if (clientIp.startsWith('::ffff:')) {
      clientIp = clientIp.replace('::ffff:', '');
    }

    const geo = detectCountryFromRequest(req);
    const ipLocation = [geo.region, geo.country].filter(Boolean).join(', ') || geo.country || '';

    let uploadedFileUrl = fileUrl || '';

    // If customer uploaded a base64 file, save it to Cloudinary
    if (fileData && !uploadedFileUrl) {
      try {
        const uploadResult = await uploadToCloudinary(fileData, 'ambica/inquiry-attachments');
        uploadedFileUrl = uploadResult?.url || '';
      } catch (uploadErr) {
        console.warn('Lead file upload failed (continuing lead creation):', uploadErr.message);
      }
    }

    const randomSuffix = Math.floor(100000 + Math.random() * 900000);

    const lead = await Lead.create({
      name: leadName,
      company: company ? company.trim() : '',
      email: leadEmail,
      phone: leadPhone,
      city: city ? city.trim() : '',
      country: country ? country.trim() : '',
      suburb: suburb ? suburb.trim() : '',
      ip: clientIp,
      ipLocation: ipLocation !== 'Unknown' ? ipLocation : '',
      service: service || 'General Requirement',
      consultType: consultType || '',
      message: message ? message.trim() : '',
      referenceId: referenceId || `AMB-${randomSuffix}`,
      fileName: fileName || '',
      fileUrl: uploadedFileUrl,
      sourcePage: sourcePage || 'Website Enquiry',
      status: 'new'
    });

    res.status(201).json({
      success: true,
      message: 'Enquiry recorded successfully in database',
      data: {
        id: lead._id,
        referenceId: lead.referenceId,
        ip: lead.ip,
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
    const { status, search, includeDeleted, page = 1, limit = 50 } = req.query;
    const query = {};

    // Soft delete filter: do not return leads deleted by admin (retained safely in database)
    if (includeDeleted !== 'true') {
      query.isDeleted = { $ne: true };
    }

    if (status && status !== 'all') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
        { country: { $regex: search, $options: 'i' } },
        { service: { $regex: search, $options: 'i' } },
        { suburb: { $regex: search, $options: 'i' } },
        { referenceId: { $regex: search, $options: 'i' } },
        { ip: { $regex: search, $options: 'i' } },
        { ipLocation: { $regex: search, $options: 'i' } }
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
 * @desc    Delete a lead from admin panel
 *          Soft delete: removes from Admin Panel view but safely retains the record in MongoDB database
 * @route   DELETE /api/leads/:id
 * @access  Private/Admin
 */
export const deleteLead = async (req, res, next) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      {
        isDeleted: true,
        deletedAt: new Date(),
        status: 'archived'
      },
      { new: true }
    );

    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }

    res.json({
      success: true,
      message: 'Lead removed from admin panel successfully (safely kept in database)',
      data: lead
    });
  } catch (error) {
    next(error);
  }
};
