import { Inject, Injectable, LoggerService } from "@nestjs/common";
import { MessageLogger } from "../../shared/interfaces/messageLogger.interface";
import { DependencyKey } from "./constants/dep_keys.constant";

@Injectable()
export class LoggingService implements LoggerService {
  constructor(
    @Inject(DependencyKey.MESSAGE_LOGGER)
    private messageLogger: MessageLogger
  ) {}
  error(message: any, ...optionalParams: any[]): any {
    this.messageLogger.error(message);
  }

  log(message: any, ...optionalParams: any[]): any {
    this.messageLogger.log(message);
  }

  warn(message: any, ...optionalParams: any[]): any {
    this.messageLogger.warn(message);
  }
}
