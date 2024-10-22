import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {
  async compressImage(file: Express.Multer.File): Promise<string> {
    const outputDir = path.join(process.cwd(), 'uploads/compress');
    const fileName = file.filename;
    const filePath = path.join(outputDir, file.filename);
    const compressedImageBuffer = await sharp(file.path)
      .webp({ quality: 75 })
      .toBuffer();

    fs.writeFileSync(filePath, compressedImageBuffer);
    return fileName;
  }
}
