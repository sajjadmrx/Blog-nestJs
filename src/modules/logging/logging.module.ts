import { DynamicModule, Global, Module } from "@nestjs/common";
import { LoggingService } from "./logging.service";
import { MessageLogger } from "../../shared/interfaces/messageLogger.interface";
import { DependencyKey } from "./constants/dep_keys.constant";

@Global()
@Module({})
export class LoggingModule {
  static register(messageLogger: MessageLogger): DynamicModule {
    return {
      module: LoggingModule,
      providers: [
        {
          provide: DependencyKey.MESSAGE_LOGGER,
          useValue: messageLogger,
        },
        LoggingService,
      ],
      exports: [LoggingService],
    };
  }
}
