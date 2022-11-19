import { Args, Query, Resolver } from "@nestjs/graphql";
import { PostModel } from "./models/post.model";
import { PostRepository } from "./post.repository";

@Resolver()
export class PostResolver {
  constructor(private postRepository: PostRepository) {}

  @Query((returns) => [PostModel])
  async all(
    @Args("page", { nullable: false }) page: number,
    @Args("limit", { nullable: false }) limit: number
  ): Promise<Array<PostModel>> {
    return this.postRepository.findPublic(page, limit, {});
  }
}
