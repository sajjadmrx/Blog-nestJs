import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { diskStorage } from "multer";
import { getResponseMessage } from "src/shared/constants/messages.constant";
import { ApiFile } from "src/shared/decorators/api-File.decorator";
import CheckRoleGuard from "src/shared/guards/check-roles.guard";
import { postFilter } from "./filters/post.filter";
import { uploadService } from "./upload.service";
import { postStorage } from "./upload.storages";

@Controller("uploads")
@ApiTags("Upload File")
@UseGuards(CheckRoleGuard(["ADMIN"]))
@UseGuards(AuthGuard("jwt"))
@ApiBearerAuth()
export class UploadController {
  constructor(private uploadService: uploadService) {}

  @ApiOperation({
    summary: "upload a photo for post",
    description: `Required Permission: 'ADMIN'`,
  })
  @ApiConsumes("multipart/form-data")
  @ApiFile("cover")
  @Post("posts")
  @UseInterceptors(
    FileInterceptor("cover", {
      storage: postStorage(),
      fileFilter: postFilter,
    })
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.upload(file);
  }
}
