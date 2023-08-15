import { OnQueueCompleted, Process, Processor } from "@nestjs/bull";
import { QueuesConstant } from "../../../shared/constants/queues.constant";
import { Job } from "bull";
import { welcomeEmailQueue } from "../../../shared/interfaces/queues.interface";
import { MailService } from "../../mail/mail.service";
import { User } from "../../../shared/interfaces/user.interface";

@Processor(QueuesConstant.SEND_WELCOME_EMAIL)
export class SendWelcomeEmailConsumer {
  constructor(private mailService: MailService) {}
  @Process()
  async handleSender(job: Job<welcomeEmailQueue>): Promise<void> {
    try {
      const user: User = job.data.user;
      await this.mailService.sendWelcome(user);
    } catch (e) {
      throw e;
    }
  }

  @OnQueueCompleted()
  logCompleted(job: Job<welcomeEmailQueue>) {
    // console.log(`Completed: ${job.id}`);
  }
}
