import { PostService } from "../post.service";
import { PostRepository } from "../post.repository";
import { Post } from "../../../shared/interfaces/post.interface";
import { BadRequestException } from "@nestjs/common";
import { getResponseMessage } from "../../../shared/constants/messages.constant";
import { fileHasExist } from "../../../shared/functions/fileValidator.func";
import * as fileValidator from "../../../shared/functions/fileValidator.func";
import { CategoriesRepository } from "../../categories/categories.repository";

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

let postInput = {
  content: "test",
  cover: "my-cover.png",
  tags: ["AAA"],
  published: false,
  title: "test",
  categories: [1, 2],
};

describe("PostService", function () {
  let postService: PostService;
  let postRepository: PostRepository;
  let categoriesRepository: CategoriesRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    const fnMock = jest.fn() as unknown as any;
    postRepository = new PostRepository(jest.fn() as unknown as any);
    categoriesRepository = new CategoriesRepository(
      jest.fn() as unknown as any
    );
    postService = new PostService(
      postRepository,
      categoriesRepository,
      fnMock,
      fnMock
    );
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
    it("should return post", async () => {
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

  describe("create()", function () {
    describe("cover", function () {
      it("should throw FILE_NOT_EXIST,when set unknown cover image", async () => {
        jest
          .spyOn(fileValidator, "fileHasExist")
          .mockImplementation(async () => false);

        await expect(postService.create(1, postInput)).rejects.toEqual(
          new BadRequestException("FILE_NOT_EXIST")
        );
      });
      it("should ignore file check, when file field is null", async () => {
        jest
          .spyOn(fileValidator, "fileHasExist")
          .mockImplementation(async () => true);

        postInput.cover = null;

        await expect(postService.create(1, postInput)).rejects.toThrowError();

        expect(fileValidator.fileHasExist).not.toBeCalled();
      });
    });

    describe("categories", function () {
      it("should throw CATEGORIES_NOT_EXIST,when set unknown categories", async () => {
        postInput.cover = null;
        jest
          .spyOn(categoriesRepository, "hasExistWithIds")
          .mockImplementation(async () => false);
        await expect(postService.create(1, postInput)).rejects.toEqual(
          new BadRequestException(getResponseMessage("CATEGORIES_NOT_EXIST"))
        );
      });
    });

    describe("tags", function () {
      it("should throw TAGS_INVALID, when tags not array", async () => {
        postInput.tags = "test" as unknown as any;
        postInput.cover = null;
        jest
          .spyOn(categoriesRepository, "hasExistWithIds")
          .mockImplementation(async (args) => true);

        await expect(postService.create(1, postInput)).rejects.toEqual(
          new BadRequestException(getResponseMessage("TAGS_INVALID"))
        );
      });
    });

    it("should return created post", async () => {
      jest
        .spyOn(fileValidator, "fileHasExist")
        .mockImplementation(async () => true);
      jest
        .spyOn(categoriesRepository, "hasExistWithIds")
        .mockImplementation(async () => true);
      jest.spyOn(postRepository, "create").mockImplementation(async () => post);
      await expect(postService.create(1, postInput)).resolves.toEqual(post);
    });
  });

  describe("update()", function () {
    it("should throw POST_NOT_EXIST,when not found post", async () => {
      jest
        .spyOn(postRepository, "findById")
        .mockImplementation(async () => null);

      await expect(postService.update(1, 2, postInput)).rejects.toEqual(
        new BadRequestException(getResponseMessage("POST_NOT_EXIST"))
      );
    });
  });
});
