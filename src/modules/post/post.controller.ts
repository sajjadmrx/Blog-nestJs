import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";

import { PostService } from "./post.service";



@Controller('posts')
export class PostController {
  constructor(
    private postService: PostService
  ) { }




}