import { BadRequestException, Injectable } from "@nestjs/common";
import { getResponseMessage } from "src/common/constants/messages.constant";
import { responseData } from "src/common/functions/response.func";

@Injectable()
export class uploadService {
    constructor() { }


    upload(file: Express.Multer.File) {
        try {
            if (!file)
                throw new BadRequestException(getResponseMessage("FILE_IS_REQUIRED"))

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