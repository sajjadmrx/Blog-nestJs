import { Global, Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";
import { EjsAdapter } from "@nestjs-modules/mailer/dist/adapters/ejs.adapter";
import { MailService } from "./mail.service";
import path, { join } from "path";

const providersAndExports = [MailService];
@Global()
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      },
      template: {
        dir: join(path.resolve(), "templates"),
        adapter: new EjsAdapter(),
      },
    }),
  ],
  controllers: [],
  providers: [...providersAndExports],
  exports: [...providersAndExports],
})
export class MailModule {}
