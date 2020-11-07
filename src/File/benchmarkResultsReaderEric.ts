import * as fs from 'fs';
import { BENCHMARK_RESULTS_PATH_ERIC } from "../constants";
import { Utils } from './util';

/**
 * Reads the benchmark results into one structure
 * But the benchmark results are also in the benchmark file, so it is now out of use
*/
export class BenchmarkResultsReaderEric {
    /**
     * reads all the benchmark results
     * ta001-005        1278    |     1359    |     1081    |     1293    |     1235
     */
    benchmarkResults = [];
    public readAll() {


        const files = Utils.getAllFiles(BENCHMARK_RESULTS_PATH_ERIC, []);
        for (const file of files) {
            var fileData = fs.readFileSync(file);

            const inputDataRows: string[] = fileData.toString().split("\n");

            for (let i = 0; i < inputDataRows.length; i++) {
                if (inputDataRows[i].includes("ta")) {
                    const rowItems = inputDataRows[i].trim().split(/[ ]+/);
                    for (let j = 0; j < rowItems.length; j++) {
                        if (!rowItems[j].includes("|") && !rowItems[j].includes("ta") && !rowItems[j].includes("-")) {
                            //store [benchmarkname, optimum] format
                            this.benchmarkResults.push(rowItems[j]);
                        }
                    }
                }
            }
        }

        return this.benchmarkResults;
    }
    public findOptimum(index: number) {
        return this.benchmarkResults[index];
    }

}


