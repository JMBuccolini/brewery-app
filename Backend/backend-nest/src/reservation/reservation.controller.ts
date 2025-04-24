import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
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

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number, @AuthUser('id') userId: number) {
    return this.reservationService.deleteReservation(userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateReservation(
    @Param('id') id: number,
    @AuthUser('id') userId: number,
    @Body() dto: { date: string; time: string; people: number },
  ) {
    return this.reservationService.updateReservation(id, userId, dto);
  }
}
