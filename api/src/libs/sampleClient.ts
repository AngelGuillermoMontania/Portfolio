import { S3 } from "aws-sdk";
import 'dotenv/config';

const s3Client = new S3({ 
    region: process.env.AWS_BUCKET_REGION || "A",
    accessKeyId: process.env.AWS_ACCESS_KEY || "A",
    secretAccessKey: process.env.AWS_SECRET_KEY || "A"
});

export { s3Client };