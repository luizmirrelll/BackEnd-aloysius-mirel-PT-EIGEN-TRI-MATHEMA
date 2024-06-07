import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { LibraryService } from './src/services/library.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const libraryService = app.get(LibraryService);

  console.log(await libraryService.checkBooks());
  console.log(await libraryService.checkMembers());

  try {
    console.log(await libraryService.borrowBook('M001', 'JK-45')); // Anggota Angga meminjam Harry Potter
  } catch (error) {
    console.error(error.message);
  }

  try {
    console.log(await libraryService.borrowBook('M002', 'JK-45')); // Anggota Ferry mencoba meminjam Harry Potter
  } catch (error) {
    console.error(error.message);
  }

  console.log(await libraryService.checkBooks());
  console.log(await libraryService.checkMembers());

  try {
    console.log(await libraryService.returnBook('M001', 'JK-45', 8)); // Anggota Angga mengembalikan Harry Potter setelah 8 hari
  } catch (error) {
    console.error(error.message);
  }

  console.log(await libraryService.checkBooks());
  console.log(await libraryService.checkMembers());

  await app.close();
}

bootstrap();
