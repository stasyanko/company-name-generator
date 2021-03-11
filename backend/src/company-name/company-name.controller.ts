import {Controller, Get, HttpStatus, Query, Res} from '@nestjs/common';
import {CompanyNameService} from "./company-name.service";
import {CompanyIndustryEnum} from "./enums";

@Controller('company-name')
export class CompanyNameController {
    constructor(private companyNameService: CompanyNameService) { }

    @Get('/')
    public async getAllCompanyNames(@Res() res, @Query('industry') industry) {
        const industryAsNumber = Number(industry);
        const companyNamesByIndustry = await this.companyNameService.findRandomByIndustry(industryAsNumber, 50);
        return res.status(HttpStatus.OK)
            .json(companyNamesByIndustry);
    }
}
