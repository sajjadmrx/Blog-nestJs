import { Injectable } from '@nestjs/common';
import {
    MulterModuleOptions,
    MulterOptionsFactory,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Injectable()
export class MulterConfig implements MulterOptionsFactory {
    createMulterOptions(): MulterModuleOptions {
        return {
            dest: './uploads',
            fileFilter: (req, file, cb) => {
                // check size
                const maxSize = 1024 * 1024 * 2// 2MB
                if (file.size > maxSize) {
                    return cb(new Error('File size is too large'), false)
                }
                if (file.mimetype.startsWith('image')) {
                    cb(null, true);
                } else {
                    cb(new Error('Invalid file type'), false);
                }
            },
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                    cb(null, `${randomName}-${file.originalname}`)
                }
            })


        };
    }
}