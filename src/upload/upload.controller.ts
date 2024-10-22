import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/uploadImage')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 1024 * 1024 * 5 }, // 5MB
    }),
  )
  async uploadImage(@UploadedFile() file) {
    const fileUrl = `http://localhost:3000/uploads/${file.filename}`;
    return {
      url: fileUrl,
    };
  }

  @Post('/compressd-image')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: Math.pow(1024, 2) * 5 },
    }),
  )
  async uploadImageCompressed(@UploadedFile() file) {
    const fileName = await this.uploadService.compressImage(file);
    return {
      originImage: `http://localhost:3000/uploads/${fileName}`,
      compressImage: `http://localhost:3000/uploads/compress/${fileName}`,
    };
  }
}
