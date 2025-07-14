import { Module, Post } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Posts, PostSchema } from './schemas/post.schema';
import { PostsRepository } from './repositories/posts.repository';
import { PostsMongooseRepository } from './repositories/mongoose/post.mongoose.repository';
import { PostsService } from './services/posts.service';
import { PostController } from './controllers/post.controller';

@Module({
    imports:[
        MongooseModule.forFeature([{
            name: Posts.name,
            schema:PostSchema
        }
            
        ])
    ],
    controllers:[
        PostController

    ],
    providers:[
        {
            provide: PostsRepository,
            useClass: PostsMongooseRepository,
        },
        PostsService,
    ],
})
export class PostsModule {}
