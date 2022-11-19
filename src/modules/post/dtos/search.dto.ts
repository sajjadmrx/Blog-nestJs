import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class searchPostDto {
  @Field({ nullable: true })
  title: string;
  @Field({ nullable: true })
  content: string;
  page: number;
  limit: number;
}
