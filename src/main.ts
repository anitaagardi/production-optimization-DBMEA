import { ONE_BENCHMARK } from "./constants";
import { dbmea } from "./DBMEA/dbmea";
import { BenchmarkResultsReader } from "./File/benchmarkResultsReader";
import { Solution } from "./Model/solution";

//similar parameter setting to the paper (L. Kóczy)
//i_seg and i_rans must be lower than the length of the permutation (number of jobs)
let dbmeaResultSolution: Solution = dbmea(100, 3, 2, 40, 4, 4);
//let dbmeaResultSolution: Solution = dbmea(3, 2, 2, 4, 5, 5);
console.log("calculated optimum:", dbmeaResultSolution.fitness());

const benchMarkResults = new BenchmarkResultsReader;
const results = benchMarkResults.readAll();

const currentBenchMarkName = ONE_BENCHMARK.substring(ONE_BENCHMARK.lastIndexOf('/') + 1, ONE_BENCHMARK.lastIndexOf('.'));
const benchmarkOptimum = benchMarkResults.readOptimum(results, currentBenchMarkName);

console.log("benchmark optimum:", benchmarkOptimum);

