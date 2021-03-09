import {Module} from '@nestjs/common';
import {CompanyNameService} from './company-name.service';
import {CompanyNameController} from './company-name.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {CompanyName, CompanyNameSchema} from "./schemas/company-name.schema";
import {ConsoleModule} from "nestjs-console";
import {CompanyNamePartService} from "./company-name-part.service";

@Module({
  imports: [
      MongooseModule.forFeature([
          { name: CompanyName.name, schema: CompanyNameSchema }
      ]),
      ConsoleModule
  ],
  providers: [
      CompanyNamePartService,
      CompanyNameService,
  ],
  controllers: [CompanyNameController]
})
export class CompanyNameModule {}
