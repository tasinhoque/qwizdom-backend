const { cloudinary } = require('../config');

const uploadFile = async (req, res, next) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      upload_preset: 'qwizdom',
    });

    res.locals.publicUrl = result.secure_url;
    res.locals.cloudinaryId = result.public_id;
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = uploadFile;
