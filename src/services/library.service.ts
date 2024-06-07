import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from '../repositories/book.repository';
import { MemberRepository } from '../repositories/member.repository';

@Injectable()
export class LibraryService {
  constructor(
    @InjectRepository(BookRepository)
    private readonly bookRepository: BookRepository,
    @InjectRepository(MemberRepository)
    private readonly memberRepository: MemberRepository,
  ) {}

  async borrowBook(memberCode: string, bookCode: string): Promise<string> {
    const member = await this.memberRepository.findByCode(memberCode);
    const book = await this.bookRepository.findByCode(bookCode);

    if (!member || !book) {
      throw new Error('Member or Book not found');
    }

    if (member.borrowedBooks >= 2) {
      return 'Member cannot borrow more than 2 books';
    }

    if (book.stock <= 0) {
      return 'Book is already borrowed';
    }

    if (member.isPenalized) {
      return 'Member is currently penalized';
    }

    member.borrowedBooks += 1;
    book.stock -= 1;

    await this.memberRepository.save(member);
    await this.bookRepository.save(book);

    return 'Book borrowed successfully';
  }

  async returnBook(
    memberCode: string,
    bookCode: string,
    daysBorrowed: number,
  ): Promise<string> {
    const member = await this.memberRepository.findByCode(memberCode);
    const book = await this.bookRepository.findByCode(bookCode);

    if (!member || !book) {
      throw new Error('Member or Book not found');
    }

    if (member.borrowedBooks <= 0) {
      return 'Member has not borrowed this book';
    }

    member.borrowedBooks -= 1;
    book.stock += 1;

    if (daysBorrowed > 7) {
      member.isPenalized = true;
    }

    await this.memberRepository.save(member);
    await this.bookRepository.save(book);

    return 'Book returned successfully';
  }

  async checkBooks(): Promise<
    { code: string; title: string; author: string; available: number }[]
  > {
    const books = await this.bookRepository.find();
    return books.map((book) => ({
      code: book.code,
      title: book.title,
      author: book.author,
      available: book.stock,
    }));
  }

  async checkMembers(): Promise<
    { code: string; name: string; borrowedBooks: number }[]
  > {
    const members = await this.memberRepository.find();
    return members.map((member) => ({
      code: member.code,
      name: member.name,
      borrowedBooks: member.borrowedBooks,
    }));
  }
}
