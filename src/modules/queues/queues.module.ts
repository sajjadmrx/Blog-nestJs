import { Global, Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bull";
import { QueuesConstant } from "../../shared/constants/queues.constant";
import { SendWelcomeEmailConsumer } from "./consumers/send-welcome.consumer";
import { ConfigService } from "@nestjs/config";
import { DeleteFileConsumer } from "./consumers/delete-file.consumer";

const importsAndExports = [
  BullModule.registerQueue(
    { name: QueuesConstant.SEND_WELCOME_EMAIL },
    { name: QueuesConstant.DELETE_FILE }
  ),
];

const providerAndExports = [SendWelcomeEmailConsumer, DeleteFileConsumer];
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
