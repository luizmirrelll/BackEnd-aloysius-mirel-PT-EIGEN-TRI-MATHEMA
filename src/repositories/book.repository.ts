import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { Book } from '../entities/book.entity';

@Injectable()
export class BookRepository {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async findByCode(code: string): Promise<Book | undefined> {
    return this.dataSource.getRepository(Book).findOne({ where: { code } });
  }

  async save(book: Book): Promise<Book> {
    return this.dataSource.getRepository(Book).save(book);
  }

  async find(): Promise<Book[]> {
    return this.dataSource.getRepository(Book).find();
  }
}
