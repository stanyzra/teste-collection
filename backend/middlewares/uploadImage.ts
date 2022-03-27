import multer from 'multer';

export default (multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/upload/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now().toString()}_${file.originalname}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const imgExtension = ['image/png', 'image/jpg', 'image/jpeg']
      .find((accepted) => accepted === file.mimetype);

    if (imgExtension) {
      return cb(null, true);
    }
    return cb(null, false);
  },
}));
