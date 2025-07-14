import { IPost } from "src/posts/schemas/models/post.interface";
import { PostsRepository } from "../posts.repository";
import { InjectModel } from "@nestjs/mongoose";
import { Posts } from "src/posts/schemas/post.schema";
import { Model } from "mongoose";

import { NotFoundException } from "@nestjs/common";

export class PostsMongooseRepository implements PostsRepository{

    constructor(
        @InjectModel(Posts.name) private postsModel: Model<Posts>,
    ){}

    getAllPosts(limit: number, page: number): Promise<IPost[]> {
       const offset = (page - 1)* limit
       return this.postsModel.find().skip(offset).limit(limit).exec();
    }
  async getPosts(postId: string): Promise<IPost> {
    const post = await this.postsModel
      .findById(postId)
      .lean<IPost>()   // <- retorna Promise<IPost | null>
      .exec();

    if (!post) {
      throw new NotFoundException(`Post ${postId} não encontrado`);
    }
    return post;
  }
   

 async searchPosts(query: string): Promise<IPost[]> {
    return this.postsModel.find({
      $or: [
        { titulo: { $regex: query, $options: 'i' } },
        { conteudo: { $regex: query, $options: 'i' } }
      ]
    }).exec();
  }

   async createPost(post: IPost): Promise<void> {
       const createPosts = new this.postsModel(post);
       await createPosts.save();

    }
   async updatePost(postsId: string, posts: IPost): Promise<void> {
    await this.postsModel
      .updateOne({ _id: postsId }, { $set: posts })
      .exec();
  }

  async  deletePost(postId: string): Promise<void> {
        await this.postsModel.deleteOne({_id: postId}).exec();
    }

}