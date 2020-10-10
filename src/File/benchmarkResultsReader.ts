import * as fs from 'fs';
import { BENCHMARK_RESULTS_PATH } from "../constants";
import { Utils } from './util';

/**
 * Reads the benchmark results into one structure
*/
export class BenchmarkResultsReader {
    /**
     * reads all the benchmark results
     * [instancename, optimal tardiness, calculation time]
     */
    public readAll() {
        const benchmarkResults = [];

        const files = Utils.getAllFiles(BENCHMARK_RESULTS_PATH, []);
        for (const file of files) {
            var fileData = fs.readFileSync(file);

            const inputDataRows = fileData.toString().split("\n");

            for (let i = 1; i < inputDataRows.length; i++) {
                const rowItems = inputDataRows[i].split(",");
                benchmarkResults.push(rowItems);
            }
        }

        return benchmarkResults;
    }

    /**
     * Obtain benchmark value for preloaded benchmarks
     * @param results preloaded optimum vector
     * @param currentBenchMarkName current benchmark name
     */
    readOptimum(results: any[], currentBenchMarkName: string) {
        for (const result of results) {
            if (result[0] == '"' + currentBenchMarkName + '"') {
                return result[1];
                break;
            }
        }
        throw new Error("No benchmark optimum found for: " + currentBenchMarkName);
    }

}