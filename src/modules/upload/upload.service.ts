import { BadRequestException, Injectable } from "@nestjs/common";
import { getResponseMessage } from "src/shared/constants/messages.constant";
import { responseData } from "src/shared/functions/response.func";
import { ResizeService } from "./resize.service";
import { unlink, writeFile, stat, mkdir } from "fs/promises";
@Injectable()
export class uploadService {
  constructor(private readonly resizeService: ResizeService) {}

  async upload(file: Express.Multer.File) {
    try {
      if (!file)
        throw new BadRequestException(getResponseMessage("FILE_IS_REQUIRED"));
      console.log(file.path);
      // const buffer = await this.resizeService.withPath(file.path, 500, 500); //TODO Add To queue
      //  await unlink(file.path)
      const path_ = `./uploads/posts`;

      const state = await stat(path_);
      if (!state.isDirectory()) {
        await mkdir(path_);
      }

      //   await writeFile(file.path, file);

      return file.filename;
    } catch (error) {
      throw error;
    }
  }
}
