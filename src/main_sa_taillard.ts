import { BENCHMARKS_INSTANCES_PATH_TAILLARD } from "./constants";
import { Utils } from "./File/util";
import { Solution } from "./Model/solution";
import * as fs from 'fs';
import { resetSeed } from "./Algorithms/Permutation/permutationGenerator";
import { sa } from "./Algorithms/Optimization/sa";
import { BenchmarkResultsReaderTaillard } from "./File/benchmarkResultsReaderTaillard";
import { BenchmarkReaderTaillard } from "./File/benchmarkReaderTaillard";
import { BENCHMARK_OPTIONS, setBenchmarkType } from "./File/benchmarkType";

import * as dateFormat from 'dateformat';
import { FileDetails } from "./File/fileDetails";

var myArgs = process.argv.slice(2);
let files = [];
let RESULTS_FILE = "results/Taillard/";
let argumentBenchmarkName = "";
if (myArgs.length == 0) {
    files = Utils.getAllFiles(BENCHMARKS_INSTANCES_PATH_TAILLARD, []);
    RESULTS_FILE += "all_benchmarks_sa.txt";
} else {
    files.push(BENCHMARKS_INSTANCES_PATH_TAILLARD + "" + myArgs[0]);
    let indexTai = myArgs[0].indexOf("tai");
    let indexTxt = myArgs[0].indexOf(".txt");
    argumentBenchmarkName = myArgs[0].substring(indexTai, (indexTxt - indexTai) + 1);
    RESULTS_FILE += argumentBenchmarkName;
    RESULTS_FILE += "benchmarks_sa.txt";
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
    terminationCriteria: [5000, 50000],
    temperature: [1000, 5000],
    alpha: [0.1, 0.5],
    length: [5, 10],
    optNumber: [3, 2] //only 2-opt / 3-opt
}*/
const hyperParameters = {
    terminationCriteria: [50000],
    temperature: [5000],
    alpha: [0.1],
    length: [5],
    optNumber: [3] //only 2-opt / 3-opt
}


const parameterIndexes = [

    Array.from(Array(hyperParameters.terminationCriteria.length), (v, i) => i),
    Array.from(Array(hyperParameters.temperature.length), (v, i) => i),
    Array.from(Array(hyperParameters.alpha.length), (v, i) => i),
    Array.from(Array(hyperParameters.length.length), (v, i) => i),
    Array.from(Array(hyperParameters.optNumber.length), (v, i) => i)
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
            const terminationCriteria = hyperParameters.terminationCriteria[permutations[i][0]];
            const temperature = hyperParameters.temperature[permutations[i][1]];
            const alpha = hyperParameters.alpha[permutations[i][2]];
            const length = hyperParameters.length[permutations[i][3]];
            const optNumber = hyperParameters.optNumber[permutations[i][4]];


            console.log("parameters: ", terminationCriteria, temperature, alpha, length, optNumber);

            const startTime = process.hrtime();

            let saResultSolution: Solution = sa(terminationCriteria, temperature, alpha, length, optNumber);

            optimum = saResultSolution.fitness();
            optimumJobSequence = saResultSolution.getJobSequence()
            ellapsedTime = process.hrtime(startTime);

            if (bestOptimum > optimum) {
                bestOptimum = optimum;
            }

            console.log("calculated optimum [" + i + "]: " + optimum + " benchmark optimum: " + benchmarkOptimum + " [" + ellapsedTime[0] + " sec]");

            if (benchmarkOptimum > optimum) {
                fs.appendFileSync(RESULTS_FILE, "better found !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                fs.appendFileSync("parameters: ", terminationCriteria + " " + temperature + " " + alpha + " " + length + " " + optNumber);
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
