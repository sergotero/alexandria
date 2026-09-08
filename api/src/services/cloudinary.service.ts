import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.config.js";
import createHttpError from "http-errors";

type CloudinaryUploadDTO = {
  coverURL: string | undefined,
  publicId: string | undefined
};

export const upload = async (bookId: string, file: Express.Multer.File): Promise<CloudinaryUploadDTO> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({
      folder: "Alexandria",
      resource_type: "image",
      public_id: `${bookId}`,
      transformation: {
        width: 1600,
        height: 2215,
        crop: "limit",
        format: "webp",
        quality: "auto"
      }
    },
    (error, result) => {
      if (error) {
        reject(error);
        return;
      }

      if(!result) {
        reject(createHttpError(504, "Cloudinary no devolvió ningún resultado"));
        return;
      }

      resolve({
        coverURL: result?.secure_url,
        publicId: result?.public_id
      });
    }
  );

  streamifier
    .createReadStream(file.buffer)
    .pipe(stream);
  });
}

export const destroy = async(cloudinaryId: string): Promise<void> => {
  await cloudinary.uploader.destroy(cloudinaryId);
}