import { OnQueueError, Process, Processor } from "@nestjs/bull";
import { QueuesConstant } from "../../../shared/constants/queues.constant";
import { Job } from "bull";
import { QueueDeleteFileCreate } from "../../../shared/interfaces/queues.interface";
import { fileHasExist } from "../../../shared/functions/fileValidator.func";
import { promises as fs } from "fs";
import path from "path";

@Processor(QueuesConstant.DELETE_FILE)
export class DeleteFileConsumer {
  constructor() {}

  @Process()
  async handleDeleteFile(job: Job<QueueDeleteFileCreate>) {
    try {
      const isFolder: boolean = job.data.isFolder;
      const fileName: string = job.data.filename;
      const filePath: string = job.data.filePath;
      const fullPath: string = path.resolve(
        path.join(`${filePath}/${fileName}`)
      );
      await fs.unlink(fullPath);
    } catch (e) {
      throw e;
    }
  }
  @OnQueueError()
  onError(er) {
    console.log(er);
  }
}
