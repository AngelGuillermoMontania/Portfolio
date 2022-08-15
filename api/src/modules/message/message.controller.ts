import { Body, Controller, Delete, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.ward';

import { CreateMessageDto } from './dto/create-message.dto';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.messageService.getAllMessages();
  }

  @Post()
  postMessages(@Body() body: CreateMessageDto) {
    return this.messageService.createMessage(body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteMessage(@Query('id') id: string) {
    return this.messageService.destroyMessage(id);
  }
}
