import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Message } from 'src/models/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { Repository } from 'typeorm';

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
      const newMessage = this.messageRepository.create(body);
      await this.messageRepository.save(newMessage);
      return newMessage;
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async destroyMessage(id: string) {
    try {
      await this.messageRepository.delete({ id });
      return {
        deleted: true,
      };
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }
}
