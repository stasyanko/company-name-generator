import { CompanyIndustryEnum, CompanyNameTypeEnum } from "../enums";

export class CreateCompanyNameDTO {
    value: String;
    industry: CompanyIndustryEnum;
}