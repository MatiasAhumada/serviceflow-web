import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserTypes1765150584983 implements MigrationInterface {
    name = 'AddUserTypes1765150584983'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "plan_type" TO "user_type_id"`);
        await queryRunner.query(`ALTER TYPE "public"."users_plan_type_enum" RENAME TO "users_user_type_id_enum"`);
        await queryRunner.query(`CREATE TABLE "user_types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "code" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying, "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_e5cd2af14ad148dc511d8eb0a52" UNIQUE ("code"), CONSTRAINT "PK_3f05efd7b52a7eca1f6b6f75e45" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "user_type_id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "user_type_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_cd9740f36970d326b3f65bd5e99" FOREIGN KEY ("user_type_id") REFERENCES "user_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_cd9740f36970d326b3f65bd5e99"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "user_type_id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "user_type_id" "public"."users_user_type_id_enum" NOT NULL`);
        await queryRunner.query(`DROP TABLE "user_types"`);
        await queryRunner.query(`ALTER TYPE "public"."users_user_type_id_enum" RENAME TO "users_plan_type_enum"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "user_type_id" TO "plan_type"`);
    }

}
