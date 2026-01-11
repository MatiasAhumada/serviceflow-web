import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTrialFieldsToSubscriptions1768149532454
  implements MigrationInterface
{
  name = 'AddTrialFieldsToSubscriptions1768149532454';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscriptions" ADD "is_trial" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscriptions" ADD "trial_end_date" TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscriptions" DROP COLUMN "trial_end_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscriptions" DROP COLUMN "is_trial"`,
    );
  }
}
