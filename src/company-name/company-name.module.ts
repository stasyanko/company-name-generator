import { Module } from '@nestjs/common';
import { CompanyNameService } from './company-name.service';
import { CompanyNameController } from './company-name.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {CompanyName, CompanyNameSchema} from "./schemas/company-name.schema";

@Module({
  imports: [
      MongooseModule.forFeature([
          { name: CompanyName.name, schema: CompanyNameSchema }
      ])
  ],
  providers: [CompanyNameService],
  controllers: [CompanyNameController]
})
export class CompanyNameModule {}
