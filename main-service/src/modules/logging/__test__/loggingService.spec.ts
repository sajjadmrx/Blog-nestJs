import { LoggingService } from "../logging.service";
import { ConsoleLogger } from "../loggers/console.logger";

describe("LoggingService", function () {
  describe("Console", function () {
    let loggingService: LoggingService;
    let consoleLogger: ConsoleLogger;
    beforeEach(() => {
      consoleLogger = new ConsoleLogger();
      loggingService = new LoggingService(consoleLogger);
    });
    it("should Defined", function () {
      expect(loggingService).toBeDefined();
    });
    it("should called warn", function () {
      jest.spyOn(consoleLogger, "warn").mockImplementation();
      loggingService.warn("Hello");
      expect(consoleLogger.warn).toBeCalledTimes(1);
    });
  });
});
