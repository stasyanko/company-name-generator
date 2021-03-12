import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {CompanyName, CompanyNameDocument} from "./schemas/company-name.schema";
import {CreateCompanyNameDTO} from "./dto/create-company-name.dto";
import {CompanyIndustryEnum} from "./enums";

@Injectable()
export class CompanyNameService {
    constructor(@InjectModel('CompanyName') private readonly companyNameModel: Model<CompanyNameDocument>) {}

    public async findRandomByIndustry(industry: CompanyIndustryEnum, limit: number): Promise<CompanyName[]> {
        return await this.companyNameModel
            .aggregate([
                {$match: {'industry': industry}},
                {$sample: {size: limit}}
            ])
            .limit(limit)
            .exec();
    }

    public async addCompanyName(createCompanyNameDTO: CreateCompanyNameDTO): Promise<CompanyName> {
        const newCompanyNameDTO = new this.companyNameModel(createCompanyNameDTO);
        return newCompanyNameDTO.save();
    }

    public static allCompanyIndustries(): Map<CompanyIndustryEnum, string> {
        let allCompanyIndustries: Map<CompanyIndustryEnum, string> = new Map<CompanyIndustryEnum, string>();
        allCompanyIndustries.set(CompanyIndustryEnum.Gaming, 'gaming');
        allCompanyIndustries.set(CompanyIndustryEnum.Fitness, 'fitness');
        allCompanyIndustries.set(CompanyIndustryEnum.Art, 'art');

        return allCompanyIndustries;
    }
}
