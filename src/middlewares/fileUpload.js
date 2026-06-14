import multer from 'multer';
import path from 'path';
import fs from 'fs';
import response from '../../utils/response.js';
import { CONSTANT } from '../../utils/constants.js';

const folderPath = path.join('public', 'uploads');
const allowedMaxSize = CONSTANT.FILE.MAX_ALLOWED_FILE_SIZE_MB;
const allowedFileTypes = CONSTANT.FILE.ALLOWED_FILE_TYPES;

// Ensure upload directory exists
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath, { recursive: true });
}

// Configure storage destination and filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, folderPath),
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}${extension}`);
  },
});

// Validate file against our allowed MIME types
function checkFileType(file, cb) {
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type. Allowed types: ${allowedFileTypes.join(', ')}`));
  }
}

// Middleware generator that accepts the form-data field name (defaults to "file")
export const singleFileUploadMiddleware =
  (fieldName = 'file') =>
  (req, res, next) => {
    const upload = multer({
      storage,
      limits: { fileSize: allowedMaxSize * 1024 * 1024 },
      fileFilter: (req, file, cb) => checkFileType(file, cb),
    }).single(fieldName);

    upload(req, res, (err) => {
      // Handle Multer-specific errors (like file size limit)
      if (err) {
        return response.badRequest(res, { message: err.message });
      }

      // If no file was uploaded, just move to the next middleware
      if (!req.file) {
        req.body.uploadedFilePath = null;
        return next();
      }

      // Strip "public" from the path and normalize backslashes for standard web URLs
      const filePath = req.file.path.replace('public', '').replace(/\\/g, '/');

      // Pass the formatted path directly into req.body
      req.body.uploadedFilePath = filePath;

      return next();
    });
  };
