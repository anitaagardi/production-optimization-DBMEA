import { BENCHMARKS_INSTANCES_PATH_TAILLARD } from "./constants";
import { Utils } from "./File/util";
import { Solution } from "./Model/solution";
import * as fs from 'fs';
import { resetSeed } from "./Algorithms/Permutation/permutationGenerator";
import { ga } from "./Algorithms/Optimization/ga";
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
    RESULTS_FILE += "all_benchmarks_ga.txt";
} else {
    files.push(BENCHMARKS_INSTANCES_PATH_TAILLARD + "" + myArgs[0]);
    let indexTai = myArgs[0].indexOf("tai");
    let indexTxt = myArgs[0].indexOf(".txt");
    argumentBenchmarkName = myArgs[0].substring(indexTai, (indexTxt - indexTai) + 1);
    RESULTS_FILE += argumentBenchmarkName;
    RESULTS_FILE += "benchmarks_ga.txt";
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
    terminationCriteria: [500, 1000],
    population: [50, 1000],
    elitism: [5],
    oxRate: [0.3],
    cxRate: [0.3],
    pmxRate: [0.3],
    mutationRate: [0.1]
}*/
const hyperParameters = {
    terminationCriteria: [1000],
    population: [1000],
    elitism: [5],
    oxRate: [0.3],
    cxRate: [0.3],
    pmxRate: [0.3],
    mutationRate: [0.1]
}



const parameterIndexes = [

    Array.from(Array(hyperParameters.terminationCriteria.length), (v, i) => i),
    Array.from(Array(hyperParameters.population.length), (v, i) => i),
    Array.from(Array(hyperParameters.elitism.length), (v, i) => i),
    Array.from(Array(hyperParameters.oxRate.length), (v, i) => i),
    Array.from(Array(hyperParameters.cxRate.length), (v, i) => i),
    Array.from(Array(hyperParameters.pmxRate.length), (v, i) => i),
    Array.from(Array(hyperParameters.mutationRate.length), (v, i) => i)
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
            const population = hyperParameters.population[permutations[i][1]];
            const elitism = hyperParameters.elitism[permutations[i][2]];
            const oxRate = hyperParameters.oxRate[permutations[i][3]];
            const cxRate = hyperParameters.cxRate[permutations[i][4]];
            const pmxRate = hyperParameters.pmxRate[permutations[i][5]];
            const mutationRate = hyperParameters.pmxRate[permutations[i][6]];

            console.log("parameters: ", terminationCriteria, population, elitism, oxRate, cxRate, pmxRate, mutationRate);

            const startTime = process.hrtime();

            let gaResultSolution: Solution = ga(terminationCriteria, population, elitism, oxRate, cxRate, pmxRate, mutationRate);

            optimum = gaResultSolution.fitness();
            optimumJobSequence = gaResultSolution.getJobSequence()
            ellapsedTime = process.hrtime(startTime);

            if (bestOptimum > optimum) {
                bestOptimum = optimum;
            }

            console.log("calculated optimum [" + i + "]: " + optimum + " benchmark optimum: " + benchmarkOptimum + " [" + ellapsedTime[0] + " sec]");

            if (benchmarkOptimum > optimum) {
                fs.appendFileSync(RESULTS_FILE, "better found !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                fs.appendFileSync("parameters: ", terminationCriteria + " " + population + " " + elitism + " " + oxRate + " " + cxRate + " " + pmxRate + " " + mutationRate);
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
