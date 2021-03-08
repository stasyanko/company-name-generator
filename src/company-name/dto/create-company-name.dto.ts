import { CompanyIndustryEnum, CompanyNameTypeEnum } from "../enums";

export class CreateCompanyNameDTO {
    readonly type: CompanyNameTypeEnum;
    readonly value: String;
    readonly industry: CompanyIndustryEnum;
}