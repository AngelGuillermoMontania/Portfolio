import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Message } from 'src/models/message.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) {}

  async getAllMessages() {
    try {
      const allMessages = await this.messageRepository.find();
      return allMessages;
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async createMessage(body: CreateMessageDto) {
    try {
      const newMessage = await this.messageRepository.save(body);
      return {
        ...newMessage,
        create: true,
      };
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async destroyMessage(id: string) {
    try {
      const deleteMessage = await this.messageRepository.delete({
        id,
      });
      return {
        ...deleteMessage,
        deleted: true,
      };
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }
}
