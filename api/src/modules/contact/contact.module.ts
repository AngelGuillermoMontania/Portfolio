import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Contact } from 'src/models/contact.entity';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';

@Module({
  imports: [TypeOrmModule.forFeature([Contact])],
  providers: [ContactService],
  exports: [TypeOrmModule],
  controllers: [ContactController],
})
export class ContactModule {}
