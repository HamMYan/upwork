import { ApiProperty, ApiTags, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto {
    @ApiProperty()
    name: string
    @ApiProperty()
    surname: string
    @ApiProperty()
    age: number
    @ApiProperty()
    phone: string
    @ApiProperty()
    salary: number;
}


export class ForGetPassword{
    @ApiProperty()
    code: number
    @ApiProperty()
    newPassword: string
    @ApiProperty()
    confirmPassword: string
}

export class UpdatePassword{
    @ApiProperty()
    oldPassword: string
    @ApiProperty()
    newPassword: string
    @ApiProperty()
    confirmPassword: string
}

export class UpdatePicUrl{
    @ApiProperty()
    picUrl: string
}

export class Login{
    @ApiProperty()
    username: string
    @ApiProperty()
    password: string
}