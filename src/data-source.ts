import { DataSource } from 'typeorm';
import { Book } from './entities/book.entity';
import { Member } from './entities/member.entity';

export const dataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [Book, Member],
  synchronize: true,
});
