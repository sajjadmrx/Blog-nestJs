import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { ApiFile } from "src/shared/decorators/api-File.decorator";
import CheckRoleGuard from "src/shared/guards/check-roles.guard";
import { postFilter } from "./filters/post.filter";
import { uploadService } from "./upload.service";
import { postStorage } from "./upload.storages";
import { ResponseInterceptor } from "../../shared/interceptors/response.interceptor";
import { authGuard } from "../../shared/guards/auth.guard";

@ApiTags("Upload File")
@ApiBearerAuth()
@UseInterceptors(ResponseInterceptor)
@UseGuards(CheckRoleGuard(["ADMIN"]))
@UseGuards(authGuard(false))
@Controller("uploads")
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
