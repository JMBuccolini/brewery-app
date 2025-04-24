import { Module, Res } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [UsersModule, AuthModule, ReservationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
