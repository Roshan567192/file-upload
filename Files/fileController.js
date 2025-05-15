// src/files/fileController.js
const multer = require('multer');
const { File } = require('../models');
const { enqueueJob } = require('../Jobs/worker');

const upload = multer({
  dest: './uploads/',
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
});

const uploadFile = async (req, res) => {
  const { title, description } = req.body;
  const file = req.file;

  try {
    const newFile = await File.create({
      userId: req.user.id, // Assuming the user is authenticated
      originalFilename: file.originalname,
      storagePath: file.path,
      title,
      description,
    });

    enqueueJob(newFile.id); // Enqueue the job for file processing

    res.status(200).json({
      fileId: newFile.id,
      status: 'uploaded',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'File upload failed' });
  }
};

module.exports = { uploadFile,upload };
