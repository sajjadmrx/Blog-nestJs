import { BadRequestException, Injectable } from "@nestjs/common";
import { getResponseMessage } from "src/common/constants/messages.constant";
import { responseData } from "src/common/functions/response.func";
import { ResizeService } from "./resize.service";
import { unlink, writeFile } from 'fs/promises'
@Injectable()
export class uploadService {
    constructor(
        private readonly resizeService: ResizeService
    ) { }


    async upload(file: Express.Multer.File) {
        try {
            if (!file)
                throw new BadRequestException(getResponseMessage("FILE_IS_REQUIRED"))

            const buffer = await this.resizeService.withPath(file.path, 500, 500)
            //  await unlink(file.path)
            await writeFile(file.path, buffer)

            return responseData({
                statusCode: 'OK',
                message: getResponseMessage("SUCCESS"),
                data: file.filename,
            })
        } catch (error) {
            throw error
        }
    }
}