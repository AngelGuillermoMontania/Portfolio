import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SoftSkill } from 'src/models/softSkill.entity';
import { SoftController } from './soft.controller';
import { SoftService } from './soft.service';

@Module({
  imports: [TypeOrmModule.forFeature([SoftSkill])],
  exports: [TypeOrmModule],
  controllers: [SoftController],
  providers: [SoftService],
})
export class SoftModule {}
