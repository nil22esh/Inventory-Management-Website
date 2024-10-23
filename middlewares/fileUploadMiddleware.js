import multer, { diskStorage } from "multer";

const diskStorageConfig = diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/images/");
  },
  filename: (req, file, callback) => {
    const fileName = Date.now() + "-" + file.originalname;
    callback(null, fileName);
  },
});

export const uploadFile = multer({ storage: diskStorageConfig });
