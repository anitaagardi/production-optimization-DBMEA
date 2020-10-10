import { BENCHMARKS_INSTANCES_PATH, ONE_BENCHMARK } from "./constants";
import { dbmea } from "./DBMEA/dbmea";
import { BenchmarkReader } from "./File/BenchmarkReader";
import { BenchmarkResultsReader } from "./File/benchmarkResultsReader";
import { Utils } from "./File/util";
import { Solution } from "./Model/solution";
import * as fs from 'fs';

const files = Utils.getAllFiles(BENCHMARKS_INSTANCES_PATH, []);

console.log("number of benchmarks: ", files.length);

const RESULTS_FILE = "results/all_benchmarks.txt";

for (const file of files) {
    console.log(file)
    Solution.benchmarkReader = new BenchmarkReader();
    Solution.benchmarkReader.readOne(file);

    let dbmeaResultSolution: Solution = dbmea(100, 3, 2, 40, 4, 4);

    const optimum = dbmeaResultSolution.fitness();
    console.log("calculated optimum:", optimum);

    const benchMarkResults = new BenchmarkResultsReader;
    const results = benchMarkResults.readAll();

    const currentBenchMarkName = file.substring(file.lastIndexOf('/') + 1, file.lastIndexOf('.'));
    const benchmarkOptimum = benchMarkResults.readOptimum(results, currentBenchMarkName);
    if(benchmarkOptimum > optimum)
    {
        fs.appendFileSync(RESULTS_FILE, "better found");
        console.log("Better found !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    }
    console.log("benchmark optimum:", benchmarkOptimum);
    fs.appendFileSync(RESULTS_FILE, file + ": " + optimum + " " + benchmarkOptimum + "\n");
}
