import { BadRequestException, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { diskStorage } from "multer";
import { getResponseMessage } from "src/common/constants/messages.constant";
import { ApiFile } from "src/common/decorators/api-File.decorator";
import CheckRoleGuard from "src/common/guards/check-roles.guard";
import { postFilter } from "./filters/post.filter";
import { uploadService } from "./upload.service";
import { postStorage } from "./upload.storages";


@Controller('uploads')
@ApiTags("Upload File")
@UseGuards(CheckRoleGuard(["ADMIN"]))
@UseGuards(AuthGuard("jwt"))
@ApiBearerAuth()
export class UploadController {

    constructor(private uploadService: uploadService) { }


    @Post('posts')
    @ApiFile('cover')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('cover', {
        storage: postStorage(),
        fileFilter: postFilter,
    }))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        return this.uploadService.upload(file)
    }

}