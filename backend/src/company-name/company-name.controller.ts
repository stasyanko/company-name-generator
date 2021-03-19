import {Controller, Get, HttpStatus, Query, Res} from '@nestjs/common';
import {CompanyNameService} from "./company-name.service";

@Controller('company-name')
export class CompanyNameController {
    constructor(private companyNameService: CompanyNameService) { }

    @Get('/industry')
    public async getAllCompanyIndustries(@Res() res) {
        return res.status(HttpStatus.OK)
            .json(CompanyNameService.allCompanyIndustriesOptions());
    }

    @Get('/')
    public async getAllCompanyNames(
        @Res() res,
        @Query('industry') industry
    ) {
        const industryAsNumber = Number(industry);
        const companyNamesByIndustry = await this.companyNameService
            .findRandomByIndustry(industryAsNumber, 50);

        return res.status(HttpStatus.OK)
            .json(companyNamesByIndustry);
    }
}
