const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload image endpoint
router.post('/image', async (req, res) => {
  try {
    console.log('Received upload request');
    
    const { image } = req.body;
    
    if (!image) {
      return res.status(400).json({ 
        message: 'No image data provided' 
      });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(image, {
      folder: 'restaurant-menu',
      resource_type: 'image'
    });

    console.log('Image uploaded successfully:', result.secure_url);

    res.json({
      message: 'Image uploaded successfully',
      imageUrl: result.secure_url
    });

  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({ 
      message: 'Error uploading image to Cloudinary',
      error: error.message 
    });
  }
});

module.exports = router;