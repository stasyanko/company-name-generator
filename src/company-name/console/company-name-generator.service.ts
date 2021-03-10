import {Command, Console, createSpinner} from "nestjs-console";
import {CompanyNamePartService} from "../company-name-part.service";
import {CompanyIndustryEnum} from "../enums";

@Console()
export class CompanyNameGeneratorService {
    constructor(private readonly companyNamePartService: CompanyNamePartService) {}

    @Command({
        command: 'generate:company:names',
        description: 'Generates and stores company names.'
    })
    async generate(name: string): Promise<void> {
        // show a spinner in a terminal
        const spin = createSpinner();
        spin.start(`Starting to generate company names`);
        // get all common parts paired
        const allCommonPartsPaired = await this.companyNamePartService.allCommonPartsPaired();
        const allIndustries = [
            CompanyIndustryEnum.Gaming,
            CompanyIndustryEnum.Fitness,
            CompanyIndustryEnum.Art,
        ];

        for (const industryIndex of allIndustries) {
            const companyNameParts = this.companyNamePartService.findByIndustry(Number(industryIndex));

            for (const companyNamePart of companyNameParts) {
                // let res = this.generateAllPermutations([
                //     companyNamePart.value,
                //     'a',
                //     'b'
                // ]);
            }
        }

        spin.succeed('Listing done');
    }

    private generateAllPermutations(inputArray: string[]): string[] {
        let resArr = [];

        // Generate the permutation for a given n (amount of elements) and a given array
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
            var firstLetter = str.toLowerCase().substr(0, 1);
            return firstLetter.toUpperCase() + str.substr(1);
        }

        generate(inputArray.length, inputArray);

        return resArr;
    }
}