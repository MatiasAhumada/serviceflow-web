import { MigrationInterface, QueryRunner } from "typeorm";

export class FixUserRelations1765151153250 implements MigrationInterface {
    name = 'FixUserRelations1765151153250'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_b6bb02f6cd87c7ae80f1bbb9339"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_7ae6334059289559722437bcc1c"`);
        await queryRunner.query(`CREATE TABLE "user_types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "code" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying, "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_e5cd2af14ad148dc511d8eb0a52" UNIQUE ("code"), CONSTRAINT "PK_3f05efd7b52a7eca1f6b6f75e45" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "company_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "plan_type"`);
        await queryRunner.query(`DROP TYPE "public"."users_plan_type_enum"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "REL_b6bb02f6cd87c7ae80f1bbb933"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "subscription_id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "companyId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD "userTypeId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD "roleId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_6f9395c9037632a31107c8a9e58" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a8f61a419ce5313def9b0f4c21e" FOREIGN KEY ("userTypeId") REFERENCES "user_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a8f61a419ce5313def9b0f4c21e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_6f9395c9037632a31107c8a9e58"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roleId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "userTypeId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "companyId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "subscription_id" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "REL_b6bb02f6cd87c7ae80f1bbb933" UNIQUE ("subscription_id")`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role_id" uuid`);
        await queryRunner.query(`CREATE TYPE "public"."users_plan_type_enum" AS ENUM('vendor', 'technician', 'company')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "plan_type" "public"."users_plan_type_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "company_id" uuid`);
        await queryRunner.query(`DROP TABLE "user_types"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_7ae6334059289559722437bcc1c" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_b6bb02f6cd87c7ae80f1bbb9339" FOREIGN KEY ("subscription_id") REFERENCES "subscriptions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
