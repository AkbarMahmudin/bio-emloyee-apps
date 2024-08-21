import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { DbModule } from '@app/db';
import { AuthModule } from './auth/auth.module';
import { BioModule } from './bio/bio.module';
import { EducationModule } from './education/education.module';
import { TrainingModule } from './training/training.module';
import { ExperienceModule } from './experience/experience.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UserModule,
    DbModule,
    AuthModule,
    BioModule,
    EducationModule,
    TrainingModule,
    ExperienceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
