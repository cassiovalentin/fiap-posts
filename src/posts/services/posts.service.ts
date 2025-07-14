import { Injectable } from "@nestjs/common";
import { PostsRepository } from "../repositories/posts.repository";
import { IPost } from "../schemas/models/post.interface";

@Injectable()
export class PostsService {

    constructor(private readonly postsRepository:PostsRepository){};
    async getAllPosts(limit:number, page: number) {
        return this.postsRepository.getAllPosts(limit,page);
    }
    async searchPosts(query: string) {
        return this.postsRepository.searchPosts(query);
    }

    async getPosts(postId: string){
        return this.postsRepository.getPosts(postId);
    }

    async createPost(post: IPost){
        return this.postsRepository.createPost(post);
    }
    async updatePost(postId: string, post:IPost){
        return this.postsRepository.updatePost(postId,post);
    }
    async deletePost(postId: string){
        return this.postsRepository.deletePost(postId);

    }

}