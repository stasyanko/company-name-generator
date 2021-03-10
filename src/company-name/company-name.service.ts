import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {CompanyName, CompanyNameDocument} from "./schemas/company-name.schema";
import {CreateCompanyNameDTO} from "./dto/create-company-name.dto";
import {CompanyIndustryEnum} from "./enums";

@Injectable()
export class CompanyNameService {
    constructor(@InjectModel('CompanyName') private readonly companyNameModel: Model<CompanyNameDocument>) {
    }

    async findRandomByIndustry(industry: CompanyIndustryEnum, limit: number): Promise<CompanyName[]> {
        return await this.companyNameModel
            .aggregate([
                {$match: {'industry': industry}},
                {$sample: {size: limit}}
            ])
            .limit(limit)
            .exec();
    }

    async addCompanyName(createCompanyNameDTO: CreateCompanyNameDTO): Promise<CompanyName> {
        const newCompanyNameDTO = new this.companyNameModel(createCompanyNameDTO);
        return newCompanyNameDTO.save();
    }
}
