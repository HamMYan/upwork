import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Login } from 'src/user/dto/update-user.dto';
import { Role } from 'src/user/entities/role-enum';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { HasRoles } from './has-roles.decorator';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { RoleGuard } from './roles.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/register')
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const data = await this.userService.create(createUserDto);
      return res.status(HttpStatus.CREATED).json(data);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
    }
  }
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() log: Login) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  @HasRoles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('admin')
  onlyAdmin(@Request() req) {
    return req.user;
  }

  @HasRoles(Role.FREELANCER)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('freelancer')
  onlyFreelancer(@Request() req) {
    return req.user;
  }
  @HasRoles(Role.COSTUMER)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('costumer')
  onlyCostumer(@Request() req) {
    return req.user;
  }

}
