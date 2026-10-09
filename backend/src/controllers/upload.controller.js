import { uploadToCloudinary } from '../config/cloudinary.js';

/**
 * @desc    Upload image to Cloudinary
 * @route   POST /api/upload
 * @access  Private (Admin)
 */
export const uploadImage = async (req, res, next) => {
  try {
    const { image, folder = 'ambica/blogs' } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: 'No image data provided. Please provide an image (base64 string or URL).'
      });
    }

    const result = await uploadToCloudinary(image, folder);

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully to Cloudinary',
      url: result.url,
      public_id: result.public_id
    });
  } catch (error) {
    console.error('Cloudinary upload controller error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to upload image to Cloudinary'
    });
  }
};
