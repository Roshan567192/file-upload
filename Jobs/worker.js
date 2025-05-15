// src/jobs/worker.js
const { Queue, Worker } = require('bullmq');
const { File } = require('../models');
const Redis = require('ioredis');
const connection = new Redis({
  host: 'localhost',  // Replace with your Redis host if necessary
  port: 6379,         // Replace with your Redis port if necessary
  maxRetriesPerRequest: null // Disable retry attempts on failure
});

// Create the queue
const fileQueue = new Queue('file-processing', { connection });

// Job processing logic
const processFile = async (job) => {
  try {
    const file = await File.findByPk(job.data.fileId);
    if (!file) throw new Error('File not found');

    // Simulate processing (e.g., file hash or extract text)
    await new Promise(resolve => setTimeout(resolve, 3000));

    await file.update({
      status: 'processed',
      extractedData: 'Mock checksum or processed result',
    });

    console.log(`File processed: ${file.id}`);
  } catch (error) {
    console.error('File processing failed:', error.message);
    const file = await File.findByPk(job.data.fileId);
    if (file) {
      await file.update({
        status: 'failed',
        extractedData: error.message,
      });
    }
  }
};

// Create a worker to consume jobs
const worker = new Worker('file-processing', processFile, { connection });

// Function to enqueue jobs
const enqueueJob = (fileId) => {
  return fileQueue.add('process-file', { fileId });
};

module.exports = { enqueueJob };
