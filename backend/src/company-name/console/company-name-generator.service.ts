import {Command, Console, createSpinner} from "nestjs-console";
import {CompanyNamePartService} from "../company-name-part.service";
import {CompanyIndustryEnum} from "../enums";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {CompanyNameDocument} from "../schemas/company-name.schema";
import {CompanyNameService} from "../company-name.service";

@Console()
export class CompanyNameGeneratorService {
    constructor(
        private readonly companyNamePartService: CompanyNamePartService,
        @InjectModel('CompanyName') private readonly companyNameModel: Model<CompanyNameDocument>
    ) {}

    @Command({
        command: 'generate:company:names',
        description: 'Generates and stores company names.'
    })
    public async generate(name: string): Promise<void> {
        // show a spinner in a terminal
        const spin = createSpinner();
        spin.start(`Starting to generate company names`);

        // get all common parts paired
        const allCommonPartsPaired = await this.companyNamePartService.allCommonPartsPaired();
        const allIndustries = CompanyNameService.allCompanyIndustries().keys();

        for (const industryIndex of allIndustries) {
            let generatedNamesForIndustry = this.generateAllForIndustry(industryIndex, allCommonPartsPaired);
            await this.storeGeneratedNamesForIndustry(generatedNamesForIndustry, industryIndex);
        }

        spin.succeed('Listing done');
    }

    private async storeGeneratedNamesForIndustry(generatedNamesForIndustry: string[], industryIndex: CompanyIndustryEnum): Promise<void> {
        await this.companyNameModel.bulkWrite(generatedNamesForIndustry.map((item) => {
            return {
                updateOne: {
                    filter: {value: item},
                    update: {
                        value: item,
                        industry: industryIndex,
                    },
                    upsert: true
                }
            };
        }));
    }

    private generateAllForIndustry(industryIndex: CompanyIndustryEnum, allCommonPartsPaired: Array<[string, string]>): string[] {
        let res: string[] = [];

        const companyNameParts = this.companyNamePartService.findByIndustry(Number(industryIndex));
        for (const companyNamePart of companyNameParts) {
            for (const commonPartPaired of allCommonPartsPaired) {
                res.push(...this.generateAllPermutations([
                    companyNamePart.value,
                    commonPartPaired[0],
                    commonPartPaired[1]
                ]));
            }
        }

        return res;
    }

    private generateAllPermutations(inputArray: string[]): string[] {
        let resArr: string[] = [];

        // Generate the permutation for a given n (amount of elements) and a given array
        // The function uses Heap's algorithm permutation
        // The implementation of the algorithm is taken from here https://xaviergeerinck.com/post/algorithms/solve-permutation-heaps
        function generate(n: number, arr: string[]) {
            // If only 1 element, just output the array
            if (n === 1) {
                let companyName = arr
                    .map(ucFirst)
                    .join('');
                resArr.push(companyName);
                return;
            }

            for (let i = 0; i < n; i+= 1) {
                generate(n - 1, arr);
                // If n is even
                if (n % 2 == 0) {
                    swap(arr, i, n - 1);
                } else {
                    swap(arr, 0, n - 1);
                }
            }
        }

        function swap(arr, idxA, idxB) {
            let tmp = arr[idxA];
            arr[idxA] = arr[idxB];
            arr[idxB] = tmp;
        }

        function ucFirst(str: string): string {
            let firstLetter = str.toLowerCase().substr(0, 1);
            return firstLetter.toUpperCase() + str.substr(1);
        }

        generate(inputArray.length, inputArray);

        return resArr;
    }
}