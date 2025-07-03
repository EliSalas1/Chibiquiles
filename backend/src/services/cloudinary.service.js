const cloudinary = require('../utils/cloudinary');

async function uploadImageFromUrl(imageUrl, publicId = null) {
  try {
    const result = await cloudinary.uploader.upload(imageUrl, {
      public_id: publicId ? `chibiquiles/${publicId}` : undefined,
      overwrite: true,      // 🔥 muy importante, evita duplicados si subes misma imagen
      folder: 'chibiquiles' // opcional, para agrupar tus imágenes
    });

    console.log('✅ Imagen subida a Cloudinary:', result.secure_url);
    return result.secure_url;

  } catch (error) {
    console.error('Error subiendo a Cloudinary:', error);
    throw error;
  }
}

module.exports = { uploadImageFromUrl };
