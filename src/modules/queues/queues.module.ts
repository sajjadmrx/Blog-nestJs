import { Global, Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bull";
import { QueuesConstant } from "../../shared/constants/queues.constant";
import { SendWelcomeEmailProcessor } from "./consumers/send-welcome.consumer";
import { ConfigService } from "@nestjs/config";

const importsAndExports = [
  BullModule.registerQueue({ name: QueuesConstant.SEND_WELCOME_EMAIL }),
];

const providerAndExports = [SendWelcomeEmailProcessor];
@Global()
@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        redis: {
          host: config.get<string>("REDIS_URL"),
        },
      }),
      inject: [ConfigService],
    }),
    ...importsAndExports,
  ],
  providers: [...providerAndExports],
  exports: [...importsAndExports, ...providerAndExports],
})
export class QueuesModule {}
