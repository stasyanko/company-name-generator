import {Controller, Get, HttpStatus, Res} from '@nestjs/common';
import {CompanyNameService} from "./company-name.service";

@Controller('company-name')
export class CompanyNameController {
    constructor(private companyNameService: CompanyNameService) { }

    @Get('/')
    async getAllCompanyNames(@Res() res) {
        const companyNames = await this.companyNameService.getAllCompanyNames();
        return res.status(HttpStatus.OK).json(companyNames);
    }
}
