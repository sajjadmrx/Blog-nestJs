import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { QueuesConstant } from "../../../shared/constants/queues.constant";
import { ReSizeFileQueue } from "../../../shared/interfaces/queues.interface";
import { ResizeService } from "../../upload/resize.service";
import { writeFile } from "fs/promises";

@Processor(QueuesConstant.RESIZE_FILE)
export class ReSizeFileConsumer {
  constructor(private resizeService: ResizeService) {}
  @Process()
  async handler(job: Job<ReSizeFileQueue>) {
    try {
      const data: ReSizeFileQueue = job.data;
      const filePath: string = data.filePath;
      const buffer = await this.resizeService.withPath(
        filePath,
        data.width,
        data.height
      );
      await writeFile(filePath, buffer);
    } catch (e) {
      throw e;
    }
  }
}
