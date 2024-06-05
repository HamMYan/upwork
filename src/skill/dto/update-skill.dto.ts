import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSkillDto } from './create-skill.dto';

export class UpdateSkillDto{
    @ApiProperty()
    name: string
}
