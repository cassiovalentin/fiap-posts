import { IPost } from "../schemas/models/post.interface";

export abstract class PostsRepository{
    abstract  getAllPosts(limit:number, page:number): Promise<IPost[]>;
    abstract getPosts(postId: string): Promise<IPost>;
    abstract searchPosts(query: string): Promise<IPost[]>;  
    abstract createPost(post: IPost): Promise<void>;
    abstract updatePost(postId:string, post:IPost): Promise<void>;
    abstract deletePost(postId:string):Promise<void>;
}