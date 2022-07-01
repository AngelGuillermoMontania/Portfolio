import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { About } from '../../models/about.entity';
import { AboutController } from './about.controller';
import { AboutService } from './about.service';
import { ContactController } from '../contact/contact.controller';

@Module({
  imports: [TypeOrmModule.forFeature([About])],
  providers: [AboutService],
  exports: [TypeOrmModule],
  controllers: [AboutController],
})
export class AboutModule {}