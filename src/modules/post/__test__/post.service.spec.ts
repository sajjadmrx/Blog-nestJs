import { PostService } from "../post.service";
import { PostRepository } from "../post.repository";
import { Post } from "../../../shared/interfaces/post.interface";
import { BadRequestException } from "@nestjs/common";
import { getResponseMessage } from "../../../shared/constants/messages.constant";

let post: Post = {
  id: 1,
  cover: "my-cover.png",
  authorId: 1,
  tags: "tag1,tag2",
  content: "my content",
  title: "title",
  published: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("PostService", function () {
  let postService: PostService;
  let postRepository: PostRepository;
  beforeEach(() => {
    const fnMock = jest.fn() as unknown as any;
    postRepository = new PostRepository(jest.fn() as unknown as any);
    postService = new PostService(postRepository, fnMock, fnMock, fnMock);
  });

  it("should Defined", () => {
    expect(postService).toBeDefined();
  });

  describe("singlePost()", function () {
    it("should throw POST_NOT_EXIST", async () => {
      jest.spyOn(postRepository, "findById").mockImplementation(() => null);

      await expect(postService.singlePost(post.id)).rejects.toEqual(
        new BadRequestException(getResponseMessage("POST_NOT_EXIST"))
      );
    });
    it("should throw POST_NOT_EXIST,when post is private", async () => {
      post.published = false;
      jest
        .spyOn(postRepository, "findById")
        .mockImplementation(async () => post);

      await expect(postService.singlePost(post.id)).rejects.toEqual(
        new BadRequestException(getResponseMessage("POST_NOT_EXIST"))
      );
    });
    it("should return post when found post", async () => {
      post.published = true;
      jest
        .spyOn(postRepository, "findById")
        .mockImplementation(async () => post);
      await expect(postService.singlePost(post.id)).resolves.toEqual(post);
    });
    it("should handle database error", async () => {
      jest.spyOn(postRepository, "findById").mockImplementation(() => {
        throw new Error("request time out!");
      });

      await expect(postService.singlePost(post.id)).rejects.toThrowError();
    });
  });
});
