import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateParentDto } from './dto/create-parent.dto';

@Injectable()
export class ParentService {

  constructor(private prisma: PrismaService) {}

  async create(createParentDto: CreateParentDto) {
    const existingParent =
        await this.prisma.parent.findUnique({
        where: {
            email: createParentDto.email,
        },
        });
    if (existingParent) {
            throw new BadRequestException(
            'Parent with this email already exists',
            );
        }

    return this.prisma.parent.create({
      data: createParentDto,
    });
  }

  async findAll() {

    return this.prisma.parent.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}