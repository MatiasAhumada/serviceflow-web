import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPopularAndFeatureListToPlans1768010239607
  implements MigrationInterface
{
  name = 'AddPopularAndFeatureListToPlans1768010239607';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "plans" ADD "popular" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "plans" ADD "feature_list" jsonb NOT NULL DEFAULT '[]'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "plans" DROP COLUMN "feature_list"`);
    await queryRunner.query(`ALTER TABLE "plans" DROP COLUMN "popular"`);
  }
}
