import {Body, Controller, Put, UseGuards, Request} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @UseGuards(JwtAuthGuard)
    @Put('update')
    async updateProfile(@Request() req, @Body() dto: UpdateUserDto) {
      const userId = req.user.userId;
      return this.usersService.updateUser(userId, dto);
    }
}
