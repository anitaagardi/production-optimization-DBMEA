import * as fs from 'fs';
import { readdirSync, statSync } from 'fs';
import { BENCHMARK_RESULTS_PATH } from "../constants";

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

        const files = this.getAllFiles(BENCHMARK_RESULTS_PATH, []);
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
     * Gets all the files recursivelly from a path
     * @param dir starting directory
     */
    private getAllFiles(dirPath, arrayOfFiles) {
        let files = fs.readdirSync(dirPath);

        arrayOfFiles = arrayOfFiles || [];

        files.forEach(file => {
            if (fs.statSync(dirPath + "/" + file).isDirectory()) {
                arrayOfFiles = this.getAllFiles(dirPath + "/" + file, arrayOfFiles);
            } else {
                arrayOfFiles.push(dirPath + "/" + file);
            }
        })

        return arrayOfFiles;
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