import crypto from 'crypto';

const getCloudinaryConfig = () => {
  return {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET ,
  };
};

/**
 * Upload an image (base64 Data URI, remote URL, or buffer string) to Cloudinary
 * @param {string} fileInput - base64 string or remote image URL
 * @param {string} folder - folder name in Cloudinary (default 'ambica/blogs')
 * @returns {Promise<{ url: string, public_id: string }>}
 */
export const uploadToCloudinary = async (fileInput, folder = 'ambica/blogs') => {
  if (!fileInput) {
    throw new Error('No image data provided for Cloudinary upload');
  }

  // If already uploaded to Cloudinary, return as is
  if (typeof fileInput === 'string' && fileInput.includes('res.cloudinary.com')) {
    return { url: fileInput, public_id: '' };
  }

  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();

  // Try official Cloudinary SDK if available
  try {
    const pkg = await import('cloudinary');
    const cloudinaryV2 = pkg.v2 || pkg.default?.v2 || pkg.default;
    if (cloudinaryV2 && typeof cloudinaryV2.config === 'function') {
      cloudinaryV2.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
        secure: true,
      });

      const uploadResult = await cloudinaryV2.uploader.upload(fileInput, {
        folder,
        resource_type: 'image',
      });

      return {
        url: uploadResult.secure_url || uploadResult.url,
        public_id: uploadResult.public_id,
      };
    }
  } catch (sdkError) {
    // SDK not loaded, fall through to native signed REST API
  }

  // Native signed REST API upload using Node.js fetch and crypto
  const timestamp = Math.round(Date.now() / 1000);
  const signatureString = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
  const signature = crypto.createHash('sha1').update(signatureString).digest('hex');

  const formData = new URLSearchParams();
  formData.append('file', fileInput);
  formData.append('api_key', apiKey);
  formData.append('timestamp', String(timestamp));
  formData.append('folder', folder);
  formData.append('signature', signature);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();

  if (!response.ok || data.error) {
    throw new Error(data.error?.message || 'Failed to upload image to Cloudinary');
  }

  return {
    url: data.secure_url || data.url,
    public_id: data.public_id,
  };
};

export default {
  uploadToCloudinary,
};
