import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {CompanyName, CompanyNameDocument} from "./schemas/company-name.schema";
import {CreateCompanyNameDTO} from "./dto/create-company-name.dto";
import {ConsoleService} from "nestjs-console";

@Injectable()
export class CompanyNameService {
    constructor(
        @InjectModel('CompanyName') private readonly companyNameModel: Model<CompanyNameDocument>,
        private readonly consoleService: ConsoleService
    ) {
        // get the root cli
        const cli = this.consoleService.getCli();

        // create a single command (See [npm commander arguments/options for more details])
        this.consoleService.createCommand(
            {
                command: 'generate:company:names',
                description: 'The command generates all possible combinations of prefixes, body and postfixes and puts them to the proper collection.'
            },
            this.generateCompanyNames,
            cli // attach the command to the cli
        );
    }

    async getAllCompanyNames(): Promise<CompanyName[]> {
        return  await this.companyNameModel.find().exec();
    }

    async addCompanyName(createCompanyNameDTO: CreateCompanyNameDTO): Promise<CompanyName> {
        const newCompanyNameDTO = new this.companyNameModel(createCompanyNameDTO);
        return newCompanyNameDTO.save();
    }

    private async generateCompanyNames(): Promise<any> {
        console.log('DONE');
    }
}
