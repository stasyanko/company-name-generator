import {Controller, Get, HttpStatus, Res} from '@nestjs/common';
import {CompanyNameService} from "./company-name.service";
import {CompanyIndustryEnum} from "./enums";

@Controller('company-name')
export class CompanyNameController {
    constructor(private companyNameService: CompanyNameService) { }

    @Get('/')
    async getAllCompanyNames(@Res() res) {
        const companyNamesByIndustry = await this.companyNameService.findByIndustry(CompanyIndustryEnum.Gaming);
        return res.status(HttpStatus.OK).json(companyNamesByIndustry);
    }
}
