
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';


@Injectable()
export class ReservationService {
  constructor(private prisma: PrismaService) {}

  async createReservation(data: {
    userId: number;
    breweryName: string;
    date: string;
    time: string;
    people: number;
  }) {
    const existingReservation = await this.prisma.reservation.findFirst({
      where: {
        userId: data.userId,
        breweryName: data.breweryName,
        date: new Date(data.date),
      },
    });
  
    if (existingReservation) {
      throw new BadRequestException('Ya tenés una reserva en este lugar para ese día.');
    }
  
    return this.prisma.reservation.create({
      data: {
        breweryName: data.breweryName,
        date: new Date(data.date),
        time: data.time,
        people: data.people,
        userId: data.userId,
      },
    });
  }
  

  async getReservationsByUser(userId: number) {
    return this.prisma.reservation.findMany({
      where: { userId },
      orderBy: { date: 'asc' },
    });
  }
  
}
