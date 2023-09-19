import { v4 as uuidV4 } from 'uuid';
import { Connection } from 'typeorm';
import { hashSync } from 'bcrypt';
import { Seeder, Factory } from 'typeorm-seeding';
import { User, UserRoles } from '../../../modules/users/model/User';

export default class CreateMasterUser implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const master = await connection
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.role = :role', { role: UserRoles.master })
      .getOne();

    if (master) {
      return;
    }
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          id: uuidV4(),
          name: 'Master',
          email: 'master@master.com',
          password: hashSync('123456789', 8),
          role: UserRoles.master,
        },
      ])
      .execute();
  }
}
