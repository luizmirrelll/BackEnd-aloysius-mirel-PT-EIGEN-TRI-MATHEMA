import { Controller, Get, Post, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { LibraryService } from '../services/library.service';

@ApiTags('library')
@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Get('books')
  @ApiOperation({ summary: 'Check available books' })
  @ApiResponse({ status: 200, description: 'List of available books' })
  async checkBooks() {
    return this.libraryService.checkBooks();
  }

  @Get('members')
  @ApiOperation({ summary: 'Check library members' })
  @ApiResponse({ status: 200, description: 'List of library members' })
  async checkMembers() {
    return this.libraryService.checkMembers();
  }

  @Post('borrow')
  @ApiOperation({ summary: 'Borrow a book' })
  @ApiBadRequestResponse({ description: 'Invalid member or book code' })
  @ApiResponse({ status: 200, description: 'Book borrowed successfully' })
  async borrowBook(
    @Body('memberCode') memberCode: string,
    @Body('bookCode') bookCode: string,
  ) {
    return this.libraryService.borrowBook(memberCode, bookCode);
  }

  @Post('return')
  @ApiOperation({ summary: 'Return a borrowed book' })
  @ApiBadRequestResponse({ description: 'Invalid member or book code' })
  @ApiResponse({ status: 200, description: 'Book returned successfully' })
  async returnBook(
    @Body('memberCode') memberCode: string,
    @Body('bookCode') bookCode: string,
    @Body('daysBorrowed') daysBorrowed: number,
  ) {
    return this.libraryService.returnBook(memberCode, bookCode, daysBorrowed);
  }
}
