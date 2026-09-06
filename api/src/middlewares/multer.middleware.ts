import createHttpError from "http-errors";
import multer from "multer";

const storage = multer.memoryStorage();

export const uploader = multer({
  storage,
  limits: {
    fieldSize: 5 * 1024 * 1024,
    files: 1
  },
  fileFilter: (req, file, cb) => {
    
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp"
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(createHttpError(415, "Tipo de imagen no permitido"));
    }
  }
});

export default uploader;