import { S3 } from '@aws-sdk/client-s3';
import moment from 'moment';
import crypto from 'crypto';
import { Readable } from 'stream';

const s3 = new S3({
  region: process.env.AWS_REGION_NAME as string, // Ensure the region is provided
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

// Function to generate a new file name with current date and random string
export const generateFileName = (originalName: string): string => {
  const date = moment().format('DDMMYYYY'); // Format date as ddMMyyyy
  const randomString = crypto.randomBytes(6).toString('hex'); // Generate random string
  const extension = originalName.split('.').pop(); // Get file extension
  return `${date}_${randomString}.${extension}`;
};

// Function to upload a file to S3
export const uploadFileToS3 = async (
  file: Express.Multer.File
): Promise<string> => {
  const newFileName = generateFileName(file.originalname);

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME as string,
    Key: newFileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    // Construct the file URL
    await s3.putObject(params);
    return newFileName;
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    throw new Error('Error uploading file to S3');
  }
};

// Function to retrieve a file from S3
export const getFileFromS3 = async (key: string): Promise<Buffer> => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME as string,
    Key: key,
  };

  try {
    const { Body } = await s3.getObject(params);
    if (!Body) {
      throw new Error('File not found');
    }
    return await streamToBuffer(Body as Readable);
  } catch (error) {
    console.error('Error retrieving file from S3:', error);
    throw new Error('Error retrieving file from S3');
  }
};

// Utility function to convert stream to buffer
const streamToBuffer = (stream: Readable): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', (err) => reject(err));
  });
};
