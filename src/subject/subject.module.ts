import { Module } from '@nestjs/common';
import { SubjectController } from './subject.controller';
import { SubjectService } from './subject.service';
import { MongooseModule } from '@nestjs/mongoose';
import { subjectSchema } from 'src/database/schema/mongodb/subject.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'subject',
        schema: subjectSchema,
      },
    ]),
  ],
  controllers: [SubjectController],
  providers: [SubjectService],
})
export class SubjectModule {}
