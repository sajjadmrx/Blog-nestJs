import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { ResizeService } from "./resize.service";
import { UploadController } from "./upload.controller";
import { uploadService } from "./upload.service";

const providersAndExports = [ResizeService];

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: "./uploads",
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [uploadService, ...providersAndExports],
  exports: [...providersAndExports],
})
export class UploadModule {}
