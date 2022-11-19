import { Field, ID, ObjectType } from "@nestjs/graphql";
import { User } from "../../../shared/interfaces/user.interface";

@ObjectType({
  description: "user model",
})
export class authorModel implements Omit<User, "password" | "role" | "email"> {
  @Field((type) => ID)
  id: number;
  @Field((type) => String)
  username: string;
  @Field((type) => Date)
  createdAt: Date;
  @Field((type) => Date)
  updatedAt: Date;
}
