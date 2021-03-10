import {CompanyIndustryEnum, CompanyNameTypeEnum} from "../enums";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type CompanyNameDocument = CompanyName & Document;

@Schema()
export class CompanyName {
    @Prop()
    value: string;
    @Prop()
    industry: CompanyIndustryEnum;
}

export const CompanyNameSchema = SchemaFactory.createForClass(CompanyName).plugin(mongoosePaginate);