require('dotenv').config();

const { v2: cloudinary } = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUDNAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})

 async function uploadImage(filePath){
   return await cloudinary.uploader.upload(filePath, {
    folder : "propiedades"
   })
}

async function deleteImages(publicIds) {
  try {
      // Eliminar las imágenes de Cloudinary utilizando los public_ids proporcionados
      for (const publicId of publicIds) {
          await cloudinary.uploader.destroy(publicId);
      }
      console.log('Imágenes eliminadas de Cloudinary con éxito.');
  } catch (error) {
      console.error('Error al eliminar imágenes de Cloudinary:', error);
  }
}

module.exports = { uploadImage, deleteImages };
