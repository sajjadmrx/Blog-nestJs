export interface MessageLogger {
  log(message: string): Promise<void> | void;
  error(message: string, stack?: string): Promise<void> | void;
  warn(message: string, stack?: string): Promise<void> | void;
}
