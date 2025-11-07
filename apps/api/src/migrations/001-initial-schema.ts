import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1703000000001 implements MigrationInterface {
  name = 'InitialSchema1703000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create enums
    await queryRunner.query(`
      CREATE TYPE "plan_type_enum" AS ENUM('vendor', 'technician', 'company');
      CREATE TYPE "user_status_enum" AS ENUM('active', 'blocked', 'pending');
      CREATE TYPE "subscription_status_enum" AS ENUM('active', 'expired', 'trial', 'cancelled');
      CREATE TYPE "subscriber_type_enum" AS ENUM('company', 'user');
      CREATE TYPE "payment_status_enum" AS ENUM('paid', 'pending', 'failed');
      CREATE TYPE "payment_method_enum" AS ENUM('card', 'transfer', 'cash');
      CREATE TYPE "sale_status_enum" AS ENUM('completed', 'pending', 'canceled');
      CREATE TYPE "service_status_enum" AS ENUM('received', 'in_progress', 'completed', 'delivered');
      CREATE TYPE "cash_register_status_enum" AS ENUM('open', 'closed');
    `);

    // System Admin
    await queryRunner.query(`
      CREATE TABLE "system_admin" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "name" varchar NOT NULL,
        "email" varchar UNIQUE NOT NULL,
        "createdAt" TIMESTAMP DEFAULT now(),
        "updatedAt" TIMESTAMP DEFAULT now()
      );
    `);

    // Plans
    await queryRunner.query(`
      CREATE TABLE "plans" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "name" varchar NOT NULL,
        "slug" varchar UNIQUE NOT NULL,
        "price" decimal(10,2) NOT NULL,
        "description" text,
        "base_user_seats" integer DEFAULT 1,
        "features" jsonb DEFAULT '{}',
        "createdAt" TIMESTAMP DEFAULT now(),
        "updatedAt" TIMESTAMP DEFAULT now()
      );
    `);

    // Companies
    await queryRunner.query(`
      CREATE TABLE "companies" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "name" varchar NOT NULL,
        "cuit" varchar,
        "address" text,
        "email" varchar,
        "phone" varchar,
        "owner_user_id" uuid,
        "subscription_id" uuid,
        "created_by" uuid,
        "createdAt" TIMESTAMP DEFAULT now(),
        "updatedAt" TIMESTAMP DEFAULT now()
      );
    `);

    // Users
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "company_id" uuid,
        "name" varchar NOT NULL,
        "email" varchar UNIQUE NOT NULL,
        "password_hash" varchar NOT NULL,
        "plan_type" plan_type_enum NOT NULL,
        "status" user_status_enum DEFAULT 'active',
        "role_id" uuid,
        "subscription_id" uuid,
        "last_login" TIMESTAMP,
        "createdAt" TIMESTAMP DEFAULT now(),
        "updatedAt" TIMESTAMP DEFAULT now()
      );
    `);

    // Roles
    await queryRunner.query(`
      CREATE TABLE "roles" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "company_id" uuid NOT NULL,
        "name" varchar NOT NULL,
        "description" text,
        "createdAt" TIMESTAMP DEFAULT now(),
        "updatedAt" TIMESTAMP DEFAULT now()
      );
    `);

    // Permissions
    await queryRunner.query(`
      CREATE TABLE "permissions" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "code" varchar UNIQUE NOT NULL,
        "description" text,
        "createdAt" TIMESTAMP DEFAULT now(),
        "updatedAt" TIMESTAMP DEFAULT now()
      );
    `);

    // Role Permissions (join table)
    await queryRunner.query(`
      CREATE TABLE "role_permissions" (
        "role_id" uuid NOT NULL,
        "permission_id" uuid NOT NULL,
        PRIMARY KEY ("role_id", "permission_id")
      );
    `);

    // Subscriptions
    await queryRunner.query(`
      CREATE TABLE "subscriptions" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "subscriber_type" subscriber_type_enum NOT NULL,
        "company_id" uuid,
        "user_id" uuid,
        "plan_id" uuid NOT NULL,
        "start_date" TIMESTAMP NOT NULL,
        "end_date" TIMESTAMP NOT NULL,
        "status" subscription_status_enum DEFAULT 'active',
        "auto_renew" boolean DEFAULT true,
        "created_by" uuid NOT NULL,
        "createdAt" TIMESTAMP DEFAULT now(),
        "updatedAt" TIMESTAMP DEFAULT now()
      );
    `);

    // Add foreign key constraints
    await queryRunner.query(`
      ALTER TABLE "companies" ADD CONSTRAINT "FK_companies_owner" FOREIGN KEY ("owner_user_id") REFERENCES "users"("id") ON DELETE SET NULL;
      ALTER TABLE "companies" ADD CONSTRAINT "FK_companies_subscription" FOREIGN KEY ("subscription_id") REFERENCES "subscriptions"("id") ON DELETE SET NULL;
      ALTER TABLE "companies" ADD CONSTRAINT "FK_companies_created_by" FOREIGN KEY ("created_by") REFERENCES "system_admin"("id") ON DELETE SET NULL;
      
      ALTER TABLE "users" ADD CONSTRAINT "FK_users_company" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE SET NULL;
      ALTER TABLE "users" ADD CONSTRAINT "FK_users_role" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE SET NULL;
      ALTER TABLE "users" ADD CONSTRAINT "FK_users_subscription" FOREIGN KEY ("subscription_id") REFERENCES "subscriptions"("id") ON DELETE SET NULL;
      
      ALTER TABLE "roles" ADD CONSTRAINT "FK_roles_company" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE;
      
      ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_role_permissions_role" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE;
      ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_role_permissions_permission" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE;
      
      ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_subscriptions_company" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE;
      ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_subscriptions_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;
      ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_subscriptions_plan" FOREIGN KEY ("plan_id") REFERENCES "plans"("id") ON DELETE RESTRICT;
      ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_subscriptions_created_by" FOREIGN KEY ("created_by") REFERENCES "system_admin"("id") ON DELETE RESTRICT;
    `);

    // Create indexes
    await queryRunner.query(`
      CREATE INDEX "IDX_users_email" ON "users" ("email");
      CREATE INDEX "IDX_users_company_id" ON "users" ("company_id");
      CREATE INDEX "IDX_companies_name" ON "companies" ("name");
      CREATE INDEX "IDX_roles_company_id" ON "roles" ("company_id");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "role_permissions" CASCADE;`);
    await queryRunner.query(`DROP TABLE IF EXISTS "subscriptions" CASCADE;`);
    await queryRunner.query(`DROP TABLE IF EXISTS "permissions" CASCADE;`);
    await queryRunner.query(`DROP TABLE IF EXISTS "roles" CASCADE;`);
    await queryRunner.query(`DROP TABLE IF EXISTS "users" CASCADE;`);
    await queryRunner.query(`DROP TABLE IF EXISTS "companies" CASCADE;`);
    await queryRunner.query(`DROP TABLE IF EXISTS "plans" CASCADE;`);
    await queryRunner.query(`DROP TABLE IF EXISTS "system_admin" CASCADE;`);
    
    await queryRunner.query(`DROP TYPE IF EXISTS "cash_register_status_enum";`);
    await queryRunner.query(`DROP TYPE IF EXISTS "service_status_enum";`);
    await queryRunner.query(`DROP TYPE IF EXISTS "sale_status_enum";`);
    await queryRunner.query(`DROP TYPE IF EXISTS "payment_method_enum";`);
    await queryRunner.query(`DROP TYPE IF EXISTS "payment_status_enum";`);
    await queryRunner.query(`DROP TYPE IF EXISTS "subscriber_type_enum";`);
    await queryRunner.query(`DROP TYPE IF EXISTS "subscription_status_enum";`);
    await queryRunner.query(`DROP TYPE IF EXISTS "user_status_enum";`);
    await queryRunner.query(`DROP TYPE IF EXISTS "plan_type_enum";`);
  }
}