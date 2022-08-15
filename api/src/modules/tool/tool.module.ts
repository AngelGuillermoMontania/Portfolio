import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Tool } from 'src/models/tool.entity';
import { ToolController } from './tool.controller';
import { ToolService } from './tool.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tool])],
  exports: [TypeOrmModule],
  controllers: [ToolController],
  providers: [ToolService],
})
export class ToolModule {}
