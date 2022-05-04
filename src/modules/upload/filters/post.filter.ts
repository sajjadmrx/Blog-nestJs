import { BadRequestException } from "@nestjs/common";

export function postFilter(req, file, cb) {
    const maxSize = 1024 * 1024 * 5 // 5MB
    if (file.size > maxSize) {
        cb(new BadRequestException('FILE_SIZE_TOO_LARGE'), false)
    }
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new BadRequestException("INVALID_FILE_FORMAT"), false)
    }
    cb(null, true);
}