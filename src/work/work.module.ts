import { SkillSchema } from './../skill/entities/skill.entity';
import { Module } from '@nestjs/common';
import { WorkController } from './work.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkSchema } from './entities/work.entity';
import { WorkService } from './work.service';
import { UserSchema } from 'src/user/entities/user.entity';

@Module({
  imports:[MongooseModule.forFeature([{ name: 'Work', schema: WorkSchema }, { name: 'User', schema: UserSchema },{ name: 'Skill', schema: SkillSchema }])],
  controllers: [WorkController],
  providers: [WorkService],
})
export class WorkModule {}
