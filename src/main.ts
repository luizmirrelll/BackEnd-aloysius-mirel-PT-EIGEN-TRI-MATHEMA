import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dataSource } from './data-source';
import { Book } from './entities/book.entity';
import { Member } from './entities/member.entity';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { initialBooks, initialMembers } from './initial-data';

async function bootstrap() {
  await dataSource.initialize();

  const app = await NestFactory.create(AppModule);

  const bookRepository = dataSource.getRepository(Book);
  const memberRepository = dataSource.getRepository(Member);

  const options = new DocumentBuilder()
    .setTitle('Book And Member')
    .setDescription('Test Developer')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

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
