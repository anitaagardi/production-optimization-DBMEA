import { BENCHMARKS_INSTANCES_PATH_TAILLARD } from "./constants";
import { dbmea } from "./Algorithms/Optimization/dbmea";
import { Utils } from "./File/util";
import { Solution } from "./Model/solution";
import * as fs from 'fs';
import { resetSeed } from "./Algorithms/Permutation/permutationGenerator";
import { BenchmarkReaderTaillard } from "./File/benchmarkReaderTaillard";
import { BenchmarkResultsReaderTaillard } from "./File/benchmarkResultsReaderTaillard";
import { BENCHMARK_OPTIONS, setBenchmarkType } from "./File/benchmarkType";
import * as dateFormat from 'dateformat';
import { FileDetails } from "./File/fileDetails";
var myArgs = process.argv.slice(2);
let files = [];
let RESULTS_FILE = "results/Taillard/";
let argumentBenchmarkName = "";
if (myArgs.length == 0) {
    files = Utils.getAllFiles(BENCHMARKS_INSTANCES_PATH_TAILLARD, []);
    RESULTS_FILE += "all_benchmarks_dbmea.txt";
} else {
    files.push(BENCHMARKS_INSTANCES_PATH_TAILLARD + "" + myArgs[0]);
    let indexTai = myArgs[0].indexOf("tai");
    let indexTxt = myArgs[0].indexOf(".txt");
    argumentBenchmarkName = myArgs[0].substring(indexTai, (indexTxt - indexTai) + 1);
    RESULTS_FILE += argumentBenchmarkName;
    RESULTS_FILE += "benchmarks_dbmea.txt";
}


console.log("number of benchmarks: ", files.length);




process.on('uncaughtException', (error) => {
    console.log('Error: ', error);
    process.exit(1);
});

process.on('unhandledRejection', (error, promise) => {
    console.log(' We forgot to handle a promise rejection here: ', promise);
    console.log(' The error was: ', error);
});

/*const hyperParameters = {
    population: [50],
    terminationCriteria: [5],
    clones: [5, 6],
    infections: [20, 10],
    segmentLengths: [4, 6],
    transferSegmentLengths: [5, 6]
}*/

const hyperParameters = {
    population: [50],
    terminationCriteria: [5],
    clones: [5],
    infections: [20],
    segmentLengths: [4],
    transferSegmentLengths: [5]
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

const benchMarkResults = new BenchmarkResultsReaderTaillard;
setBenchmarkType(BENCHMARK_OPTIONS[1]);
const results = benchMarkResults.readAll();
let actualOptimumIndex = 0;
if (myArgs.length != 0) {
    actualOptimumIndex = benchMarkResults.benchmarkAssignments[argumentBenchmarkName];
}

const algorithmStartTime = dateFormat(new Date(), " yyyy:mm:dd  HH:MM:ss \n");
fs.appendFileSync(RESULTS_FILE, "Start time: " + algorithmStartTime);
for (const file of files) {
    let actualBenchmarkInstanceIndex = 0;
    console.log(file)
    Solution.benchmarkReaderTaillard = new BenchmarkReaderTaillard();
    Solution.benchmarkReaderTaillard.readTheFile(file);
    let fileSize: number = Solution.benchmarkReaderTaillard.getFileSize();
    for (let j = 0; j < fileSize; j++) {
        Solution.benchmarkReaderTaillard.setOneBenchmark(actualBenchmarkInstanceIndex);


        let optimum;
        let optimumJobSequence;
        let bestOptimum = 1000000;
        let ellapsedTime;

        const fileDetails: FileDetails = benchMarkResults.findOptimumFileDetailsByIndex(actualOptimumIndex);
        const benchmarkOptimum = fileDetails.optimum;
        const benchmarkName = fileDetails.name;

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

        fs.appendFileSync(RESULTS_FILE, benchmarkName + ": " + bestOptimum + " " + benchmarkOptimum + (bestOptimum == benchmarkOptimum ? " (=)" : "") + " [" + ellapsedTime[0] + " sec] Job sequence: " + optimumJobSequence + "\n");
        actualBenchmarkInstanceIndex++;
        actualOptimumIndex++;
    }
    const algorithmEndTime = dateFormat(new Date(), " yyyy:mm:dd  HH:MM:ss \n");;
    fs.appendFileSync(RESULTS_FILE, "End time: " + algorithmEndTime);
}
