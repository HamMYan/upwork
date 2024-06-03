import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateWorkDto } from './create-work.dto';

export class UpdateWorkDto {
    @ApiProperty()
    name: string
    @ApiProperty()
    price: number
    @ApiProperty()
    deadline: string
    @ApiProperty()
    description: string
    @ApiProperty()
    skills: []
}
export class UpdateFreelancer{
    @ApiProperty()
    workId: string
    @ApiProperty()
    freelancerId: string
}