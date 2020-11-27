import { BENCHMARKS_INSTANCES_PATH_TANAKA, ONE_BENCHMARK_TANAKA } from "./constants";
import { dbmea } from "./Algorithms/Optimization/dbmea";
import { BenchmarkReaderTanaka } from "./File/benchmarkReaderTanaka";
import { BenchmarkResultsReaderTanaka } from "./File/benchmarkResultsReaderTanaka";
import { Utils } from "./File/util";
import { Solution } from "./Model/solution";
import * as fs from 'fs';
import { resetSeed } from "./Algorithms/Permutation/permutationGenerator";
import { BENCHMARK_OPTIONS, setBenchmarkType } from "./File/benchmarkType";
import { FileDetails } from "./File/fileDetails";
import * as dateFormat from 'dateformat';

var myArgs = process.argv.slice(2);
let files = [];
let RESULTS_FILE = "results/Tanaka/";
let argumentBenchmarkName = "";
if (myArgs.length == 0) {
    files = Utils.getAllFiles(BENCHMARKS_INSTANCES_PATH_TANAKA, []);
    RESULTS_FILE += "all_benchmarks_dbmea.txt";
} else {
    files = Utils.getAllFiles(BENCHMARKS_INSTANCES_PATH_TANAKA + "/" + myArgs[0] + "/" + myArgs[1], []);

    RESULTS_FILE += argumentBenchmarkName;
    RESULTS_FILE += myArgs[0] + "_" + myArgs[1] + "benchmarks_dbmea.txt";
}
process.on('uncaughtException', (error) => {
    console.log('Error: ', error);
    process.exit(1);
});

process.on('unhandledRejection', (error, promise) => {
    console.log(' We forgot to handle a promise rejection here: ', promise);
    console.log(' The error was: ', error);
});

const hyperParameters = {
    population: [50],
    terminationCriteria: [5],
    clones: [5, 6],
    infections: [20, 10],
    segmentLengths: [4, 6],
    transferSegmentLengths: [5, 6]
}

const parameterIndexes = [
    Array.from(Array(hyperParameters.population.length), (v, i) => i),
    Array.from(Array(hyperParameters.terminationCriteria.length), (v, i) => i),
    Array.from(Array(hyperParameters.clones.length), (v, i) => i),
    Array.from(Array(hyperParameters.infections.length), (v, i) => i),
    Array.from(Array(hyperParameters.segmentLengths.length), (v, i) => i),
    Array.from(Array(hyperParameters.transferSegmentLengths.length), (v, i) => i)
];

const permutations = Utils.combineArraysRecursively(parameterIndexes);

const benchMarkResults = new BenchmarkResultsReaderTanaka;
const results = benchMarkResults.readAll();
setBenchmarkType(BENCHMARK_OPTIONS[0]);
const algorithmStartTime = dateFormat(new Date(), " yyyy:mm:dd  HH:MM:ss \n");
fs.appendFileSync(RESULTS_FILE, "Start time: " + algorithmStartTime);
for (const file of files) {
    console.log(file)
    Solution.benchmarkReaderTanaka = new BenchmarkReaderTanaka();
    Solution.benchmarkReaderTanaka.readOne(file);

    const currentBenchMarkName = file.substring(file.lastIndexOf('/') + 1, file.lastIndexOf('.'));
    const benchmarkOptimum = benchMarkResults.findOptimum(results, currentBenchMarkName);

    let optimum;
    let optimumJobSequence;
    let bestOptimum = 1000000;
    let ellapsedTime;

    for (let i = 0; i < permutations.length; i++) {
        resetSeed();

        const population = hyperParameters.population[permutations[i][0]];
        const terminationCriteria = hyperParameters.terminationCriteria[permutations[i][1]];
        const clone = hyperParameters.clones[permutations[i][2]];
        const infection = hyperParameters.infections[permutations[i][3]];
        const segmentLength = hyperParameters.segmentLengths[permutations[i][4]];
        const transferSegmentLength = hyperParameters.transferSegmentLengths[permutations[i][5]];

        console.log("parameters: ", population, terminationCriteria, clone, infection, segmentLength, transferSegmentLength);

        const startTime = process.hrtime();

        let dbmeaResultSolution: Solution = dbmea(population, terminationCriteria, clone, infection, segmentLength, transferSegmentLength);

        optimum = dbmeaResultSolution.fitness();

        optimum = dbmeaResultSolution.fitness();
        optimumJobSequence = dbmeaResultSolution.getJobSequence()
        ellapsedTime = process.hrtime(startTime);

        if (bestOptimum > optimum) {
            bestOptimum = optimum;
        }

        console.log("calculated optimum [" + i + "]: " + optimum + " benchmark optimum: " + benchmarkOptimum + " [" + ellapsedTime[0] + " sec]");

        if (benchmarkOptimum > optimum) {
            fs.appendFileSync(RESULTS_FILE, "better found !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            fs.appendFileSync("parameters: ", population + " " + terminationCriteria + " " + clone + " " + infection
                + " " + segmentLength + " " + transferSegmentLength);
            console.log("Better found !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        }
    }

    fs.appendFileSync(RESULTS_FILE, currentBenchMarkName + ": " + bestOptimum + " " + benchmarkOptimum + (bestOptimum == benchmarkOptimum ? " (=)" : "") + " [" + ellapsedTime[0] + " sec] Job sequence: " + optimumJobSequence + "\n");

}
const algorithmEndTime = dateFormat(new Date(), " yyyy:mm:dd  HH:MM:ss \n");;
fs.appendFileSync(RESULTS_FILE, "End time: " + algorithmEndTime);
