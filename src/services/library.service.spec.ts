import { Test, TestingModule } from '@nestjs/testing';
import { LibraryService } from './library.service';
import { BookRepository } from '../repositories/book.repository';
import { MemberRepository } from '../repositories/member.repository';

describe('LibraryService', () => {
  let service: LibraryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LibraryService,
        {
          provide: BookRepository,
          useValue: {},
        },
        {
          provide: MemberRepository,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<LibraryService>(LibraryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
