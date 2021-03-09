import {CompanyIndustryEnum} from "./enums";
import {CompanyNamePartDto} from "./dto/company-name-part.dto";

export class CompanyNamePartService {
    public static allCommonParts(): string[] {
        return [
            'rank',
            'titan',
            'storm',
            'flow',
            'click',
            'power',
            'shift',
            'edge',
            'dream',
        ];
    }

    public static findByIndustry(industry: CompanyIndustryEnum): CompanyNamePartDto[] {
        let companyNameParts = CompanyNamePartService.allCompanyNameParts();

        return companyNameParts.filter((companyNamePart) => {
            return companyNamePart.industry === industry;
        });
    }

    private static allCompanyNameParts(): CompanyNamePartDto[] {
        let allCompanyNameParts = [];
        // Gaming
        allCompanyNameParts.push(CompanyNamePartService.makeCompanyNamePartDto(
            CompanyIndustryEnum.Gaming,
            'game'
        ));
        allCompanyNameParts.push(CompanyNamePartService.makeCompanyNamePartDto(
            CompanyIndustryEnum.Gaming,
            'play'
        ));
        allCompanyNameParts.push(CompanyNamePartService.makeCompanyNamePartDto(
            CompanyIndustryEnum.Gaming,
            'duel'
        ));
        allCompanyNameParts.push(CompanyNamePartService.makeCompanyNamePartDto(
            CompanyIndustryEnum.Gaming,
            'fun'
        ));
        allCompanyNameParts.push(CompanyNamePartService.makeCompanyNamePartDto(
            CompanyIndustryEnum.Gaming,
            'tactic'
        ));

        return allCompanyNameParts;
    }

    private static makeCompanyNamePartDto(industry: CompanyIndustryEnum, value: string): CompanyNamePartDto {
        let companyNamePartDTO = new CompanyNamePartDto();
        companyNamePartDTO.industry = industry;
        companyNamePartDTO.value = value;
        return companyNamePartDTO;
    }
}
