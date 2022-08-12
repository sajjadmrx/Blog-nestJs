import { OnQueueCompleted, Process, Processor } from "@nestjs/bull";
import { QueuesConstant } from "../../../shared/constants/queues.constant";
import { Job } from "bull";
import { QueuesWelcomeEmailCreate } from "../../../shared/interfaces/queues.interface";
import { MailService } from "../../mail/mail.service";
import { IUser } from "../../../shared/interfaces/user.interface";

@Processor(QueuesConstant.SEND_WELCOME_EMAIL)
export class SendWelcomeEmailProcessor {
  constructor(private mailService: MailService) {}
  @Process()
  async handleSender(job: Job<QueuesWelcomeEmailCreate>): Promise<void> {
    try {
      const user: IUser = job.data.user;
      await this.mailService.sendWelcome(user);
    } catch (e) {
      throw e;
    }
  }

  @OnQueueCompleted()
  logCompleted(job: Job<QueuesWelcomeEmailCreate>) {
    console.log(`Completed: ${job.id}`);
  }
}
