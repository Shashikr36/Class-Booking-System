import { Module } from '@nestjs/common';
import { OfferingController } from './offering.controller';
import { OfferingService } from './offering.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [OfferingController],
  providers: [OfferingService],
})
export class OfferingModule {}