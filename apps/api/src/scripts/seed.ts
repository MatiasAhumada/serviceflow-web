import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DataSource } from 'typeorm';
import { seedInitialData } from '../seeds/001-initial-data';
import { seedUserTypes } from '../seeds/002-user-types';
import { seedDemoUsers } from '../seeds/003-demo-users';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  try {
    console.log('🌱 Starting database seeding...');
    await seedUserTypes(dataSource);
    await seedDemoUsers(dataSource);
    await seedInitialData(dataSource);
    console.log('✅ Database seeding completed!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await app.close();
  }
}

bootstrap();