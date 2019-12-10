import { BadRequestException } from '@nestjs/common/exceptions';
import { Request } from 'express';
import { existsSync, mkdirSync, renameSync } from 'fs';

export const fileName = (
  req: Request,
  file: Express.Multer.File,
  cb: (error: Error, filename: string) => void,
) => {
  try {
    if (!file.originalname.match(/\.(gif|jpg|jpeg|tiff|png)$/i)) {
      throw new BadRequestException('File must be image');
    }
    console.log(file);
    const ImageType = {
      'image/gif': '.gif',
      'image/png': '.png',
      'image/jpg': '.jpg',
      'image/jpeg': '.jpeg',
    };

    cb(null, req.params.id + ImageType[file.mimetype]);
  } catch (error) {
    cb(error, null);
  }
};
export const fileDestination = (
  req: Request,
  file: Express.Multer.File,
  cb: (error: Error, filename: string) => void,
) => {
  try {
    const uploadDirectory = `./dist/public/uploads/${req.params.id}`;
    if (!file.originalname.match(/\.(gif|jpg|jpeg|tiff|png)$/i)) {
      throw new BadRequestException(
        'File must be an image or supported by any images',
      );
    }
    if (!existsSync('./dist/public/')) {
      mkdirSync('./dist/public');
      mkdirSync('./dist/public/uploads');
    }
    if (!existsSync(uploadDirectory)) {
      mkdirSync(uploadDirectory);
    }

    cb(null, uploadDirectory);
  } catch (err) {
    cb(err, null);
  }
};
