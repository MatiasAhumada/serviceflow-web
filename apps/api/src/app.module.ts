import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './Middleware/Logger.middleware';
import typeOrmConfig from './config/configOrm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PlansModule } from './modules/plans/plans.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { RolesModule } from './modules/roles/roles.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { CustomersModule } from './modules/customers/customers.module';
import { SuppliersModule } from './modules/suppliers/suppliers.module';
import { ProductsModule } from './modules/products/products.module';
import { CashRegistersModule } from './modules/cash-registers/cash-registers.module';
import { SalesModule } from './modules/sales/sales.module';
import { ServiceOrdersModule } from './modules/service-orders/service-orders.module';
import { DevicesModule } from './modules/devices/devices.module';
import { WarrantiesModule } from './modules/warranties/warranties.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const typeormConfig = (await configService.get('typeorm')) as Record<
          string,
          any
        >;
        return {
          ...typeormConfig,
        };
      },
    }),
    AuthModule,
    UsersModule,
    PlansModule,
    CompaniesModule,
    RolesModule,
    PermissionsModule,
    SubscriptionsModule,
    PaymentsModule,
    CustomersModule,
    SuppliersModule,
    ProductsModule,
    CashRegistersModule,
    SalesModule,
    ServiceOrdersModule,
    DevicesModule,
    WarrantiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
