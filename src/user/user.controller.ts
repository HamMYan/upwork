import { multerOptions } from './../upload/config';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Res,
  HttpStatus,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

import {
  ForGetPassword,
  UpdateUserDto,
  UpdatePassword,
} from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Patch('/updatePassword')
  async updatePassword(
    @Req() req,
    @Body() updatePassword: UpdatePassword,
    @Res() res: Response,
  ) {
    try {
      const data = await this.userService.updatePassword(
        req.user.id,
        updatePassword,
      );
      return data;
    } catch (err) {
      return { message: err.message };
    }
  }

  @Patch('forgetPassword/:email')
  forgetPassword(@Param('email') email: string) {
    return this.userService.forgetPassword(email);
  }
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', multerOptions))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Patch('/uploadPicUrl')
  async uploadPicUrl(@Req() req, @UploadedFile() file, @Res() res: Response) {
    try {
      const data = await this.userService.updatePicUrl(req.user.id, file.filename)
      return data
    } catch (err) {
      return { message: err.message }
    }
  }
  @Post('resetPassword/:email')
  resetPassword(
    @Param('email') email: string,
    @Body() forGetPassword: ForGetPassword,
  ) {
    return this.userService.resetPassword(email, forGetPassword);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
