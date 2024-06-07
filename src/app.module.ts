import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibraryService } from './services/library.service';
import { Member } from './entities/member.entity';
import { Book } from './entities/book.entity';
import { MemberRepository } from './repositories/member.repository';
import { BookRepository } from './repositories/book.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Member, Book],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Member, Book]),
  ],
  providers: [LibraryService, MemberRepository, BookRepository],
  exports: [LibraryService],
})
export class AppModule {}
