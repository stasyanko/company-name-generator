import {Controller, Get, HttpStatus, Res} from '@nestjs/common';
import {CompanyNameService} from "./company-name.service";

@Controller('company-name')
export class CompanyNameController {
    constructor(private companyNameService: CompanyNameService) { }

    @Get('/')
    async getAllCompanyNames(@Res() res) {
        return res.status(HttpStatus.OK).json([]);
    }
}
