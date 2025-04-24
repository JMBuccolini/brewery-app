import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User as AuthUser } from '../auth/decorators/user.decorator';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @AuthUser('id') userId: number,
    @Body()
    body: { breweryName: string; date: string; time: string; people: number },
  ) {
    console.log('Usuario recibido en request.user:', userId);

    return this.reservationService.createReservation({
      userId,
      ...body,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAllByUser(@AuthUser('id') userId: number) {
    return this.reservationService.getReservationsByUser(userId);
  }
}
