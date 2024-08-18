import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { createHash } from 'crypto';
import { configDotenv } from 'dotenv';
import { extname, join } from 'path';
configDotenv({ path: join(process.cwd(), '.env') });

@Injectable()
export class S3Service {
  private readonly s3: S3;
  constructor() {
    this.s3 = new S3({
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
      },
      endpoint: process.env.S3_ENDPOINT,
      region: 'default',
    });
  }

  async uploadFile(file: Express.Multer.File, folderName: string) {
    const ext = extname(file.originalname);

    return await this.s3
      .upload({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `${folderName}/${createHash('sha256').update(file.buffer).digest('hex')}${ext}`,
        Body: file.buffer,
      })
      .promise();
  }

  async deleteFile(Key: string) {
    return await this.s3
      .deleteObject({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: decodeURI(Key),
      })
      .promise();
  }
}
