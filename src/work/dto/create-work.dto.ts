import { ApiProperty } from "@nestjs/swagger"

export class CreateWorkDto {
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
    @ApiProperty()
    apply: []
    @ApiProperty()
    user: string
}
