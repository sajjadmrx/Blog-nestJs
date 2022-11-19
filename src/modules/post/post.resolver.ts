import { Query, Resolver } from "@nestjs/graphql";

@Resolver()
export class PostResolver {
  constructor() {}

  @Query(() => String)
  sayHello(): string {
    return "Hello World!";
  }
}
