import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { Post } from "../../../shared/interfaces/post.interface";
import { authorModel } from "./author.model";

@ObjectType({
  description: "Post Model",
})
export class PostModel implements Post {
  @Field((type) => ID)
  id: number;
  @Field((type) => String)
  title: string;
  @Field((type) => String)
  content: string;
  @Field((type) => Int)
  authorId: number;
  @Field((type) => Boolean)
  published: boolean;
  @Field((type) => String)
  cover: string;
  @Field((type) => Date)
  createdAt: Date;
  @Field((type) => Date)
  updatedAt: Date;
  @Field((type) => String)
  tags: string;
  @Field((type) => authorModel)
  author: authorModel;
}
