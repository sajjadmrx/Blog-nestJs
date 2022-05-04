import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { UploadController } from "./upload.controller";
import { uploadService } from "./upload.service";

@Module({
    imports: [
        MulterModule.registerAsync({
            useFactory: () => ({
                dest: "./uploads",
            })
        })
    ],
    controllers: [UploadController],
    providers: [uploadService]
})
export class UploadModule { }