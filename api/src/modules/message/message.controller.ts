import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';

import { CreateMessageDto } from './dto/create-message.dto';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  getAll() {
    return this.messageService.getAllMessages();
  }

  @Post()
  postMessages(@Body() body: CreateMessageDto) {
    return this.messageService.createMessage(body);
  }

  @Delete()
  deleteMessage(@Query('id') id: string) {
    return this.messageService.destroyMessage(id);
  }
}
