import * as fs from 'fs';
import { BENCHMARK_RESULTS_PATH_TAILLARD } from "../constants";
import { FileDetails } from './fileDetails';
import { Utils } from './util';

/**
 * Reads the benchmark results into one structure
*/
export class BenchmarkResultsReaderTaillard {
    /**
     * reads all the benchmark results
     * ta001   1278
     */
    fileDetails: FileDetails[] = [];
    benchmarkAssignments = {
        tai20_5: 0,
        tai20_10: 10,
        tai20_20: 20,
        tai50_5: 30,
        tai50_10: 40,
        tai50_20: 50,
        tai100_5: 60,
        tai100_10: 70,
        tai100_20: 80,
        tai200_10: 90,
        tai200_20: 100,
        tai500_20: 110

    }
    public readAll() {


        const files = Utils.getAllFiles(BENCHMARK_RESULTS_PATH_TAILLARD, []);
        for (const file of files) {
            var fileData = fs.readFileSync(file);

            const inputDataRows: string[] = fileData.toString().split("\n");

            for (let i = 0; i < inputDataRows.length; i++) {

                const rowItems = inputDataRows[i].trim().split("\t");

                //store [benchmarkname, optimum] format
                this.fileDetails.push(new FileDetails(rowItems[0], Number(rowItems[1])));
            }
        }

        return this.fileDetails;
    }
    public findOptimumFileDetailsByIndex(index: number) {
        return this.fileDetails[index];
    }
    public findOptimumValueByBenchmarkName(benchmarkname: string): number {
        for (let i = 0; i < this.fileDetails.length; i++) {
            if (this.fileDetails[i].name == benchmarkname) {
                return this.fileDetails[i].optimum;
            }
        }
        throw new Error("Benchmark name is not found");
    }


}


