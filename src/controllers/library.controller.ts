import { Controller, Get, Post, Body } from '@nestjs/common';
import { LibraryService } from '../services/library.service';

@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Get('books')
  async checkBooks() {
    return this.libraryService.checkBooks();
  }

  @Get('members')
  async checkMembers() {
    return this.libraryService.checkMembers();
  }

  @Post('borrow')
  async borrowBook(
    @Body('memberCode') memberCode: string,
    @Body('bookCode') bookCode: string,
  ) {
    return this.libraryService.borrowBook(memberCode, bookCode);
  }

  @Post('return')
  async returnBook(
    @Body('memberCode') memberCode: string,
    @Body('bookCode') bookCode: string,
    @Body('daysBorrowed') daysBorrowed: number,
  ) {
    return this.libraryService.returnBook(memberCode, bookCode, daysBorrowed);
  }
}
