import {Controller, Get, HttpStatus, Res} from '@nestjs/common';
import {CompanyNameService} from "./company-name.service";
import {CompanyIndustryEnum} from "./enums";

@Controller('company-name')
export class CompanyNameController {
    constructor(private companyNameService: CompanyNameService) { }

    @Get('/')
    async getAllCompanyNames(@Res() res) {
        const companyNamesByIndustry = await this.companyNameService.findRandomByIndustry(CompanyIndustryEnum.Gaming, 50);
        return res.status(HttpStatus.OK)
            .json(companyNamesByIndustry);
    }
}
