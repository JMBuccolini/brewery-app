import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
const dayjs = require('dayjs');



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
      throw new BadRequestException(
        'Ya tenés una reserva en este lugar para ese día.',
      );
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

  async deleteReservation(userId: number, id: number) {
    const existing = await this.prisma.reservation.findUnique({
      where: { id },
    });

    if (!existing || existing.userId !== userId) {
      throw new ForbiddenException('No podés eliminar esta reserva');
    }

    return this.prisma.reservation.delete({ where: { id } });
  }

  async updateReservation(
    reservationId: number,
    userId: number,
    dto: { date: string; time: string; people: number },
  ) {
    const id = Number(reservationId);
    const existing = await this.prisma.reservation.findUnique({
      where: { id },
    });
  
    if (!existing || existing.userId !== userId) {
      throw new ForbiddenException('No podés editar esta reserva');
    }
  
    // dayjs para parsear correctamente la fecha como local sino guarda un dia antes por UTC
    const parsedDate = dayjs(dto.date).startOf('day').toDate();
  
    // validación usando la fecha ya parseada
    const duplicate = await this.prisma.reservation.findFirst({
      where: {
        id: { not: id },
        userId,
        breweryName: existing.breweryName,
        date: parsedDate,
      },
    });
  
    if (duplicate) {
      throw new BadRequestException(
        'Ya tenés otra reserva en esta cervecería ese día.',
      );
    }
  
    return this.prisma.reservation.update({
      where: { id },
      data: {
        date: parsedDate,
        time: dto.time,
        people: dto.people,
      },
    });
  }
  
}
