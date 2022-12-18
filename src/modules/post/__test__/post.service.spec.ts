import { PostService } from "../post.service";
import { PostRepository } from "../post.repository";
import { Post } from "../../../shared/interfaces/post.interface";
import { BadRequestException } from "@nestjs/common";
import { getResponseMessage } from "../../../shared/constants/messages.constant";
import { fileHasExist } from "../../../shared/utils/fileValidator.util";
import * as fileValidator from "../../../shared/utils/fileValidator.util";
import { CategoriesRepository } from "../../categories/categories.repository";
import { CreatePostDto } from "../dtos/createPost.dto";
import { LoggingService } from "../../logging/logging.service";
import { ConsoleLogger } from "../../logging/loggers/console.logger";

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

let getPostInput = (): CreatePostDto => {
  return {
    content: "test",
    cover: "my-cover.png",
    tags: ["AAA"],
    published: false,
    title: "test",
    categories: [1, 2],
  };
};

describe("PostService", function () {
  let postService: PostService;
  let postRepository: PostRepository;
  let categoriesRepository: CategoriesRepository;
  let queueDeleteFile;
  let logger: LoggingService;
  beforeEach(() => {
    jest.clearAllMocks();
    postRepository = new PostRepository(jest.fn() as unknown as any);
    categoriesRepository = new CategoriesRepository(
      jest.fn() as unknown as any
    );
    queueDeleteFile = {
      add: jest.fn(),
    };
    logger = new LoggingService(new ConsoleLogger());
    postService = new PostService(
      postRepository,
      categoriesRepository,
      queueDeleteFile,
      logger
    );
    jest.spyOn(logger, "error").mockImplementation();
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

        await expect(postService.create(1, getPostInput())).rejects.toEqual(
          new BadRequestException("FILE_NOT_EXIST")
        );
      });
      it("should ignore file check, when file field is null", async () => {
        const postInput = getPostInput();
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
        const postInput = getPostInput();
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
        const postInput = getPostInput();
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
      const postInput = getPostInput();
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
      const postInput = getPostInput();
      jest
        .spyOn(postRepository, "findById")
        .mockImplementation(async () => null);

      await expect(postService.update(1, 2, postInput)).rejects.toEqual(
        new BadRequestException(getResponseMessage("POST_NOT_EXIST"))
      );
    });
  });
  describe("delete()", function () {
    it("should throw POST_NOT_EXIST,when not found post", async () => {
      jest
        .spyOn(postRepository, "findById")
        .mockImplementation(async () => null);
      await expect(postService.delete(1, 2)).rejects.toEqual(
        new BadRequestException(getResponseMessage("POST_NOT_EXIST"))
      );
    });
    it("should return postId,when successfully delete post", async () => {
      jest
        .spyOn(postRepository, "findById")
        .mockImplementation(async () => post);
      jest.spyOn(postRepository, "delete").mockImplementation(async () => post);

      await expect(postService.delete(1, post.id)).resolves.toBe(post.id);
    });
    it("should call deleteFileQueue after delete post", async () => {
      jest
        .spyOn(postRepository, "findById")
        .mockImplementation(async () => post);
      jest.spyOn(postRepository, "delete").mockImplementation(async () => post);

      await postService.delete(1, post.id);
      expect(queueDeleteFile.add).toBeCalledTimes(1);
    });
  });
  describe("getPublicPosts()", function () {
    const posts: Post[] = [
      post,
      {
        id: 2,
        tags: "a,b,c",
        cover: "googlelogo.png",
        published: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        title: "Hello World!",
        content: "just Hello World! 🤞",
        authorId: 3,
      },
      {
        id: 3,
        tags: "a,b,c",
        cover: "googlelogo.png",
        published: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        title: "Hello World!",
        content: "just Hello World! 🤞",
        authorId: 3,
      },
    ];
    it("should return posts by matched title", async () => {
      const query = {
        content: "",
        title: "hello",
        limit: 10,
        page: 1,
      };
      const finallyPosts = posts.filter(
        (post: Post) =>
          post.title.toLowerCase().match(query.title) && post.published == true
      );

      jest.spyOn(postRepository, "findPublic").mockImplementation(async () => {
        return finallyPosts;
      });

      jest
        .spyOn(postRepository, "countPublished")
        .mockImplementation(async () => {
          return posts.filter((post) => post.published).length;
        });
      const result = await postService.getPublicPosts(query);
      expect(result.posts).toHaveLength(finallyPosts.length);
    });
    it("should return posts by matched content", async () => {
      const query = {
        content: "just",
        title: "hello",
        limit: 10,
        page: 1,
      };
      const finallyPosts = posts.filter(
        (post: Post) =>
          post.content.toLowerCase().match(query.content) &&
          post.published == true
      );

      jest.spyOn(postRepository, "findPublic").mockImplementation(async () => {
        return finallyPosts;
      });

      jest
        .spyOn(postRepository, "countPublished")
        .mockImplementation(async () => {
          return posts.filter((post) => post.published).length;
        });
      const result = await postService.getPublicPosts(query);
      expect(result.posts).toHaveLength(finallyPosts.length);
    });
    it("should return all post", async () => {
      const query = {
        content: "",
        title: "",
        limit: 10,
        page: 1,
      };
      const finallyPosts = posts.filter((post: Post) => post.published == true);

      jest.spyOn(postRepository, "findPublic").mockImplementation(async () => {
        return finallyPosts;
      });

      jest
        .spyOn(postRepository, "countPublished")
        .mockImplementation(async () => {
          return finallyPosts.length;
        });

      const result = await postService.getPublicPosts(query);
      expect(result.posts).toHaveLength(finallyPosts.length);
      expect(result.total).toBe(finallyPosts.length);
    });
  });
});
