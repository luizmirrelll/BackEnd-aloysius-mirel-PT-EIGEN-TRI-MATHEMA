import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dataSource } from './data-source';
import { Book } from './entities/book.entity';
import { Member } from './entities/member.entity';
import { initialBooks, initialMembers } from './initial-data';

async function bootstrap() {
  await dataSource.initialize();

  const app = await NestFactory.create(AppModule);

  const bookRepository = dataSource.getRepository(Book);
  const memberRepository = dataSource.getRepository(Member);

  // Check if there are no books in the database
  const bookCount = await bookRepository.count();
  if (bookCount === 0) {
    await bookRepository.save(initialBooks);
    console.log('Initial book data has been saved.');
  }

  // Check if there are no members in the database
  const memberCount = await memberRepository.count();
  if (memberCount === 0) {
    await memberRepository.save(initialMembers);
    console.log('Initial member data has been saved.');
  }

  await app.listen(3000);
}
bootstrap();
