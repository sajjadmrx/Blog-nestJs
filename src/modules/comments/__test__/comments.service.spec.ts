import { CommentsService } from "../comments.service";
import { CommentsRepository } from "../comments.repository";
import { PostRepository } from "../../post/post.repository";
import { BadRequestException, ForbiddenException } from "@nestjs/common";
import { getResponseMessage } from "../../../shared/constants/messages.constant";
import { Post } from "../../../shared/interfaces/post.interface";
import {
  Comment,
  CommentWithChilds,
} from "../../../shared/interfaces/comment.interface";

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

describe("CommentsService", function () {
  let comment: Comment;

  let commentsService: CommentsService;
  let commentsRepository: CommentsRepository;
  let postRepository: PostRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    comment = {
      id: 1,
      authorId: 2,
      updatedAt: new Date(),
      createdAt: new Date(),
      replyId: 1,
      text: "test",
      postId: 3,
    };
    const mockFn = jest.fn() as unknown as any;
    commentsRepository = new CommentsRepository(mockFn);
    postRepository = new PostRepository(mockFn);
    commentsService = new CommentsService(commentsRepository, postRepository);
  });

  it("should Defined", () => {
    expect(commentsService).toBeDefined();
  });
  describe("create()", function () {
    let commentInput = { postId: 1, text: "Hello", replyId: null };
    it("should throw POST_NOT_EXIST,when not found post", async () => {
      jest.spyOn(postRepository, "findById").mockImplementation(() => null);

      await expect(
        commentsService.create(commentInput, {} as any)
      ).rejects.toEqual(
        new BadRequestException(getResponseMessage("POST_NOT_EXIST"))
      );
    });
    it("should throw POST_NOT_EXIST,when post is Private", async () => {
      post.published = false;
      jest
        .spyOn(postRepository, "findById")
        .mockImplementation(async () => post);

      await expect(
        commentsService.create(commentInput, {} as any)
      ).rejects.toEqual(
        new BadRequestException(getResponseMessage("POST_NOT_EXIST"))
      );
    });
    it("should throw REPLY_COMMENT_NOT_FOUND,when comment not found", async () => {
      post.published = true;
      jest
        .spyOn(postRepository, "findById")
        .mockImplementation(async () => post);

      jest
        .spyOn(commentsRepository, "getById")
        .mockImplementation(async () => null);
      commentInput.replyId = 1;
      await expect(
        commentsService.create(commentInput, {} as any)
      ).rejects.toEqual(
        new BadRequestException(getResponseMessage("REPLY_COMMENT_NOT_FOUND"))
      );
    });
    it("should not called getById, when replyId is Null", async () => {
      jest
        .spyOn(postRepository, "findById")
        .mockImplementation(async () => post);
      jest.spyOn(commentsRepository, "getById").mockImplementation();
      commentInput.replyId = null;
      await expect(
        commentsService.create(commentInput, {} as any)
      ).rejects.toThrow();
      expect(commentsRepository.getById).not.toBeCalled();
    });
    it("should handle database error", async () => {
      jest.spyOn(commentsRepository, "create").mockImplementation(() => {
        throw new Error("DB TimeOut");
      });
      jest
        .spyOn(postRepository, "findById")
        .mockImplementation(async () => post);
      await expect(
        commentsService.create(commentInput, { id: 1 } as any)
      ).rejects.toThrow();
    });
    it("should create a comment", () => {
      jest
        .spyOn(postRepository, "findById")
        .mockImplementation(async () => post);
      commentInput.replyId = null;
      comment.replyId = null;
      jest
        .spyOn(commentsRepository, "create")
        .mockImplementation(async () => comment);
      expect(
        commentsService.create(commentInput, { id: comment.authorId } as any)
      ).resolves.toBe(comment.id);
    });
  });

  describe("delete()", function () {
    it("should throw NOT_FOUND,when comment not found", async function () {
      jest
        .spyOn(commentsRepository, "getById")
        .mockImplementation(async () => null);

      await expect(
        commentsService.delete(comment.id, {} as any)
      ).rejects.toThrow(
        new BadRequestException(getResponseMessage("NOT_FOUND"))
      );
    });
    it("should throw PERMISSION_DENIED,when userId not-equal authorId", async () => {
      jest
        .spyOn(commentsRepository, "getById")
        .mockImplementation(
          async () => comment as unknown as CommentWithChilds
        );
      await expect(
        commentsService.delete(comment.id, { id: 3, role: ["USER"] } as any)
      ).rejects.toThrow(new ForbiddenException("PERMISSION_DENIED"));
    });
    it("should throw PERMISSION_DENIED,when user not Admin", async () => {
      jest
        .spyOn(commentsRepository, "getById")
        .mockImplementation(
          async () => comment as unknown as CommentWithChilds
        );
      await expect(
        commentsService.delete(comment.id, { id: 9999, role: ["USER"] } as any)
      ).rejects.toThrow(new ForbiddenException("PERMISSION_DENIED"));
    });
    it("should called deleteOne & delete a comment", async () => {
      const finallyComment: CommentWithChilds =
        comment && ({ childs: [] } as unknown as CommentWithChilds);
      jest
        .spyOn(commentsRepository, "getById")
        .mockImplementation(async () => finallyComment);
      jest.spyOn(commentsRepository, "deleteOne").mockImplementation();

      await expect(
        commentsService.delete(comment.id, { role: ["ADMIN"], id: 1 } as any)
      ).resolves.toEqual({});

      expect(commentsRepository.deleteOne).toBeCalled();
    });
  });
});
