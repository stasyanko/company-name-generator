import { CompanyIndustryEnum, CompanyNameTypeEnum } from "../enums";

export class CreateCompanyNameDTO {
    type: CompanyNameTypeEnum;
    value: String;
    industry: CompanyIndustryEnum;
}