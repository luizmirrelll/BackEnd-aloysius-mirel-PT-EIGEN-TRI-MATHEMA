import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Member } from '../entities/member.entity';

@Injectable()
export class MemberRepository {
  constructor(private readonly dataSource: DataSource) {}

  async findByCode(code: string): Promise<Member | undefined> {
    return this.dataSource.getRepository(Member).findOne({ where: { code } });
  }

  async save(member: Member): Promise<Member> {
    return this.dataSource.getRepository(Member).save(member);
  }

  async find(): Promise<Member[]> {
    return this.dataSource.getRepository(Member).find();
  }
}
