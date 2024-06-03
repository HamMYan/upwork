import { Controller, Get, Post, Body, Patch, Param, Delete, Req,Res } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { FreelancerService } from './freelancer.service';


class Update{
  skill:string
}
@ApiTags('Freelancer')
@Controller('freelancer')
export class FreelancerController {
  constructor(private readonly freelancerService: FreelancerService) {}

  @Get()
  findAll() {
    return this.freelancerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.freelancerService.findOne(id);
  }
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        skill: { type: 'string' }
        
      },
    },
  })
  @Patch()
  update(@Body() obj:Update, @Req() req,@Res() res){
    try{
      const data = this.freelancerService.update(req.user.id,obj.skill)
      return res.status(HttpStatus.OK).json(data);
    }catch(err){
      return res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
    }
  }

}
