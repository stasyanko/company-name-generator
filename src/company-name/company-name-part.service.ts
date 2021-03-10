import {CompanyIndustryEnum} from "./enums";
import {CompanyNamePartDto} from "./dto/company-name-part.dto";

export class CompanyNamePartService {
    public allCommonPartsPaired(): Array<[string, string]> {
        const allCommonParts = this.allCommonParts();
        let allCommonPartsPaired = [];

        for (let i = 0; i < allCommonParts.length - 1; i++) {
            for (let j = i + 1; j < allCommonParts.length; j++) {
                allCommonPartsPaired.push([
                    allCommonParts[i],
                    allCommonParts[j]
                ]);
            }
        }

        return allCommonPartsPaired;
    }

    private allCommonParts(): string[] {
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

    public findByIndustry(industry: CompanyIndustryEnum): CompanyNamePartDto[] {
        let companyNameParts = this.allCompanyNameParts();

        return companyNameParts.filter((companyNamePart) => {
            return companyNamePart.industry === industry;
        });
    }

    private allCompanyNameParts(): CompanyNamePartDto[] {
        let allCompanyNameParts = [];
        // Gaming
        allCompanyNameParts.push(this.makeCompanyNamePartDto(
            CompanyIndustryEnum.Gaming,
            'game'
        ));
        allCompanyNameParts.push(this.makeCompanyNamePartDto(
            CompanyIndustryEnum.Gaming,
            'play'
        ));
        allCompanyNameParts.push(this.makeCompanyNamePartDto(
            CompanyIndustryEnum.Gaming,
            'duel'
        ));
        allCompanyNameParts.push(this.makeCompanyNamePartDto(
            CompanyIndustryEnum.Gaming,
            'fun'
        ));
        allCompanyNameParts.push(this.makeCompanyNamePartDto(
            CompanyIndustryEnum.Gaming,
            'tactic'
        ));

        return allCompanyNameParts;
    }

    private makeCompanyNamePartDto(industry: CompanyIndustryEnum, value: string): CompanyNamePartDto {
        let companyNamePartDTO = new CompanyNamePartDto();
        companyNamePartDTO.industry = industry;
        companyNamePartDTO.value = value;
        return companyNamePartDTO;
    }
}
