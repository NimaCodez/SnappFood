import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

export function uploadFileS3(fieldName: string) {
  return class UploadUtility extends FileInterceptor(fieldName, {
    storage: memoryStorage(),
  }) {};
}
