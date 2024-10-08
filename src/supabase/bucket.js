/* eslint-disable import/prefer-default-export */
import { S3Client } from '@aws-sdk/client-s3';

const bucket = new S3Client({
  forcePathStyle: true,
  region: 'us-west-1',
  endpoint: 'https://zecbqgvoulnxjagrjvjc.supabase.co/storage/v1/s3',
  credentials: {
    accessKeyId: 'f5bc5ea2fe62224e28404db3492bdcac',
    secretAccessKey:
      '617e2ed12a1c34b1693cc15aff4d89a29206b7f1f82251afaf0a1d2e7833f9e1'
  }
});

export { bucket };
