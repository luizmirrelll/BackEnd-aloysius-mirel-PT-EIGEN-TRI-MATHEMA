import { EntityRepository, Repository } from 'typeorm';
import { Member } from '../entities/member.entity';

@EntityRepository(Member)
export class MemberRepository extends Repository<Member> {
  findByCode(code: string): Promise<Member | undefined> {
    return this.findOne({ where: { code } });
  }
}
