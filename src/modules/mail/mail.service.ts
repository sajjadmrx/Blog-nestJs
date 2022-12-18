import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { User } from "@prisma/client";
import { MailConstant } from "../../shared/constants/mail.constant";

@Injectable()
export class MailService {
  constructor(private emailService: MailerService) {}

  async sendWelcome(user: User): Promise<void> {
    try {
      const brandName: string = "x";
      await this.emailService.sendMail({
        from: MailConstant.FROM,
        to: user.email,
        subject: `welcome to ${brandName} blog!`,
        context: {
          username: user.username,
        },
        template: "welcome.ejs",
      });
    } catch (e) {
      throw e;
    }
  }
}
