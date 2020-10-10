import { BENCHMARKS_INSTANCES_PATH, ONE_BENCHMARK } from "./constants";
import { dbmea } from "./DBMEA/dbmea";
import { BenchmarkReader } from "./File/BenchmarkReader";
import { BenchmarkResultsReader } from "./File/benchmarkResultsReader";
import { Utils } from "./File/util";
import { Solution } from "./Model/solution";

//similar parameter setting to the paper (L. Kóczy)
//i_seg and i_rans must be lower than the length of the permutation (number of jobs)

const files = Utils.getAllFiles(BENCHMARKS_INSTANCES_PATH, []);

console.log("number of benchmarks: ", files.length);

for (const file of files) {
    console.log(file)
    Solution.benchmarkReader = new BenchmarkReader();
    Solution.benchmarkReader.readOne(file);

    let dbmeaResultSolution: Solution = dbmea(100, 3, 2, 40, 4, 4);

    console.log("calculated optimum:", dbmeaResultSolution.fitness());

    const benchMarkResults = new BenchmarkResultsReader;
    const results = benchMarkResults.readAll();

    const currentBenchMarkName = file.substring(file.lastIndexOf('/') + 1, file.lastIndexOf('.'));
    const benchmarkOptimum = benchMarkResults.readOptimum(results, currentBenchMarkName);

    console.log("benchmark optimum:", benchmarkOptimum);
}
