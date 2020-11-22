import { BENCHMARKS_INSTANCES_PATH_TANAKA, ONE_BENCHMARK_TANAKA } from "./constants";
import { dbmea } from "./Algorithms/Optimization/dbmea";
import { BenchmarkReaderTanaka } from "./File/benchmarkReaderTanaka";
import { BenchmarkResultsReaderTanaka } from "./File/benchmarkResultsReaderTanaka";
import { Utils } from "./File/util";
import { Solution } from "./Model/solution";
import * as fs from 'fs';
import { resetSeed } from "./Algorithms/Permutation/permutationGenerator";
import { BENCHMARK_OPTIONS, setBenchmarkType } from "./File/benchmarkType";
import { dbmea_sa } from "./Algorithms/Optimization/dbmea_sa";

const files = Utils.getAllFiles(BENCHMARKS_INSTANCES_PATH_TANAKA, []);

console.log("number of benchmarks: ", files.length);

const RESULTS_FILE = "results/Tanaka/all_benchmarks_dbmea_sa.txt";

const hyperParameters = {
    dbmea_population: [4],
    dbmea_terminationCriteria: [2],
    dbmea_clones: [5],
    dbmea_infections: [20],
    dbmea_segmentLengths: [4],
    dbmea_transferSegmentLengths: [5],
    sa_terminationCriteria: [400],
    sa_temperature: [1000],
    sa_alpha: [0.1],
    sa_length: [5],
    sa_optNumber: [3] //only 2-opt / 3-opt

}

const parameterIndexes = [
    Array.from(Array(hyperParameters.dbmea_population.length), (v, i) => i),
    Array.from(Array(hyperParameters.dbmea_terminationCriteria.length), (v, i) => i),
    Array.from(Array(hyperParameters.dbmea_clones.length), (v, i) => i),
    Array.from(Array(hyperParameters.dbmea_infections.length), (v, i) => i),
    Array.from(Array(hyperParameters.dbmea_segmentLengths.length), (v, i) => i),
    Array.from(Array(hyperParameters.dbmea_transferSegmentLengths.length), (v, i) => i),
    Array.from(Array(hyperParameters.sa_terminationCriteria.length), (v, i) => i),
    Array.from(Array(hyperParameters.sa_temperature.length), (v, i) => i),
    Array.from(Array(hyperParameters.sa_alpha.length), (v, i) => i),
    Array.from(Array(hyperParameters.sa_length.length), (v, i) => i),
    Array.from(Array(hyperParameters.sa_optNumber.length), (v, i) => i)
];

const permutations = Utils.combineArraysRecursively(parameterIndexes);

const benchMarkResults = new BenchmarkResultsReaderTanaka;
const results = benchMarkResults.readAll();
setBenchmarkType(BENCHMARK_OPTIONS[0]);
for (const file of files) {
    console.log(file)
    Solution.benchmarkReaderTanaka = new BenchmarkReaderTanaka();
    Solution.benchmarkReaderTanaka.readOne(file);

    const currentBenchMarkName = file.substring(file.lastIndexOf('/') + 1, file.lastIndexOf('.'));
    const benchmarkOptimum = benchMarkResults.findOptimum(results, currentBenchMarkName);

    let optimum;
    let bestOptimum = 1000000;

    for (let i = 0; i < permutations.length; i++) {
        resetSeed();

        const dbmea_population = hyperParameters.dbmea_population[permutations[i][0]];
        const dbmea_terminationCriteria = hyperParameters.dbmea_terminationCriteria[permutations[i][1]];
        const dbmea_clone = hyperParameters.dbmea_clones[permutations[i][2]];
        const dbmea_infection = hyperParameters.dbmea_infections[permutations[i][3]];
        const dbmea_segmentLength = hyperParameters.dbmea_segmentLengths[permutations[i][4]];
        const dbmea_transferSegmentLength = hyperParameters.dbmea_transferSegmentLengths[permutations[i][5]];
        const sa_terminationCriteria = hyperParameters.sa_terminationCriteria[permutations[i][0]];
        const sa_temperature = hyperParameters.sa_temperature[permutations[i][1]];
        const sa_alpha = hyperParameters.sa_alpha[permutations[i][2]];
        const sa_length = hyperParameters.sa_length[permutations[i][3]];
        const sa_optNumber = hyperParameters.sa_optNumber[permutations[i][4]];
        console.log("parameters: ", dbmea_population, dbmea_terminationCriteria, dbmea_clone, dbmea_infection, dbmea_segmentLength, dbmea_transferSegmentLength, sa_terminationCriteria, sa_temperature, sa_alpha, sa_length, sa_optNumber);

        const startTime = process.hrtime();

        let dbmeaResultSolution: Solution = dbmea_sa(dbmea_population, dbmea_terminationCriteria, dbmea_clone, dbmea_infection, dbmea_segmentLength, dbmea_transferSegmentLength, sa_terminationCriteria, sa_temperature, sa_alpha, sa_length, sa_optNumber);

        optimum = dbmeaResultSolution.fitness();

        const ellapsedTime = process.hrtime(startTime);

        if (bestOptimum > optimum) {
            bestOptimum = optimum;
        }

        console.log("calculated optimum [" + i + "]: " + optimum + " benchmark optimum: " + benchmarkOptimum + " [" + ellapsedTime[0] + " sec]");

        if (benchmarkOptimum > optimum) {
            fs.appendFileSync(RESULTS_FILE, "better found !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            fs.appendFileSync("parameters: ", dbmea_population + " " + dbmea_terminationCriteria + " " + dbmea_clone + " " + dbmea_infection
                + " " + dbmea_segmentLength + " " + dbmea_transferSegmentLength + " " + sa_terminationCriteria + " " + sa_temperature + " " + sa_alpha + " " + sa_length + " " + sa_optNumber);
            console.log("Better found !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        }
    }

    fs.appendFileSync(RESULTS_FILE, file + ": " + bestOptimum + " " + benchmarkOptimum + (bestOptimum == benchmarkOptimum ? " (=)" : "") + "\n");
}
