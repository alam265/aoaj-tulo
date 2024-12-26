const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: 'dh64f8e7j',
  api_key: '489883453723141',
  api_secret: 'LTrt118hNI4hPr3lVy7G3Dz1EnA',
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    if (file.mimetype.startsWith('video/')) {
      return {
        folder: 'issue_reports/videos',
        allowed_formats: ['mp4', 'avi', 'mov'],
        resource_type: 'video',
        
      };
    } else if (file.mimetype.startsWith('image/')) {
      return {
        folder: 'issue_reports/images',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
        resource_type: 'image',
         
      };
    }
  }
});

const upload = multer({ storage: storage }); 

module.exports = { 
    upload
}
