import {BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query} from "@nestjs/common";
import { PostsService } from "../services/posts.service";
import { IPost } from "../schemas/models/post.interface";

@Controller('posts')
export class PostController{
    constructor(private readonly postService: PostsService){}

    @Get()
    async getAllPost(@Query('limit') limit:number, @Query('page')page:number){
        return this.postService.getAllPosts(limit, page);

    }
     @Get('search')
  async searchPosts(@Query('query') query: string) {
    if (!query) throw new BadRequestException('Query param is required');
    return this.postService.searchPosts(query);
  }

    
   @Get(':postId')
   async getPosts(@Param('postId') postId: string){
    return this.postService.getPosts(postId);
   }




   @Post()
   async createPost(@Body() post:IPost){
    return this.postService.createPost(post);

   }
   @Put(':postId')
   async updatePost(@Param('postId')postId: string,@Body() post:IPost){
    return this.postService.updatePost(postId,post);
   }
   @Delete(':postId')
   async deletePost(@Param('postId')postId:string ){
    return this.postService.deletePost(postId);
   }
   
   
}