const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

function fileFilter(req, file, cb) {
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
  // To reject this file pass `false`, like so:

  // To accept the file pass `true`, like so:

  // You can always pass an error if something goes wrong:
  //   cb(new Error("I don't have a clue!"));
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

const uploadSingle = (fileName) => {
  return (req, res, next) => {
    const uploadSingle = upload.single(fileName);
    uploadSingle(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        return res
          .status(400)
          .send({ message: err.message, errorType: "Multer Error" });
      } else if (err) {
        // An unknown error occurred when uploading.
        return res
          .status(400)
          .send({ message: err.message, errorType: "Normal Error" });
      }

      // Everything went fine.
      next();
    });
  };
};
const uploadMultiple = (fileName, fileCount) => {
  return (req, res, next) => {
    const uploadSingle = upload.array(fileName, fileCount);
    uploadSingle(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        return res
          .status(400)
          .send({ message: err.message, errorType: "Multer Error" });
      } else if (err) {
        // An unknown error occurred when uploading.
        return res
          .status(400)
          .send({ message: err.message, errorType: "Normal Error" });
      }

      // Everything went fine.
      next();
    });
  };
};

module.exports = { uploadSingle, uploadMultiple };
module.exports = upload;
