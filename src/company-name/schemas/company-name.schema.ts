import {CompanyIndustryEnum, CompanyNameTypeEnum} from "../enums";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";

export type CompanyNameDocument = CompanyName & Document;

@Schema()
export class CompanyName {
    @Prop()
    type: CompanyNameTypeEnum;
    @Prop()
    value: string;
    @Prop()
    industry: CompanyIndustryEnum;
}

export const CompanyNameSchema = SchemaFactory.createForClass(CompanyName);