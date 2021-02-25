import { BENCHMARKS_INSTANCES_PATH_TAILLARD } from "./constants";
import { Utils } from "./File/util";
import { Solution } from "./Model/solution";
import * as fs from 'fs';
import { resetSeed } from "./Algorithms/Permutation/permutationGenerator";
import { BenchmarkReaderTaillard } from "./File/benchmarkReaderTaillard";
import { BenchmarkResultsReaderTaillard } from "./File/benchmarkResultsReaderTaillard";
import { BENCHMARK_OPTIONS, setBenchmarkType } from "./File/benchmarkType";
import { dbmea_sa } from "./Algorithms/Optimization/dbmea_sa";
import { FileDetails } from "./File/fileDetails";
import * as dateFormat from 'dateformat';

var myArgs = process.argv.slice(2);
let files = [];
let RESULTS_FILE = "results/Taillard/";
let argumentBenchmarkName = "";
if (myArgs.length == 0) {
    files = Utils.getAllFiles(BENCHMARKS_INSTANCES_PATH_TAILLARD, []);
    RESULTS_FILE += "all_benchmarks_dbmea_sa.txt";
} else {
    files.push(BENCHMARKS_INSTANCES_PATH_TAILLARD + "" + myArgs[0]);
    let indexTai = myArgs[0].indexOf("tai");
    argumentBenchmarkName = myArgs[0].substring(indexTai).replace(".txt", "");
    RESULTS_FILE += argumentBenchmarkName;
    RESULTS_FILE += "benchmarks_dbmea_sa.txt";
}

if (process.argv[3] === undefined) {
    console.log("number of benchmarks: ", files.length);
}

const hyperParameters = {
    dbmea_population: [8],
    dbmea_terminationCriteria: [2],
    dbmea_clones: [5],
    dbmea_infections: [40],
    dbmea_segmentLengths: [4],
    dbmea_transferSegmentLengths: [5],
    dbmea_mortality_rate: [0.05], //less than the dbmea_population!!!
    sa_terminationCriteria: [400],
    sa_temperature: [1000],
    sa_alpha: [0.1],
    sa_length: [2],
    sa_optNumber: [4] //only 2-opt / 3-opt / 4-simple swap
}

const parameterIndexes = [
    Array.from(Array(hyperParameters.dbmea_population.length), (v, i) => i),
    Array.from(Array(hyperParameters.dbmea_terminationCriteria.length), (v, i) => i),
    Array.from(Array(hyperParameters.dbmea_clones.length), (v, i) => i),
    Array.from(Array(hyperParameters.dbmea_infections.length), (v, i) => i),
    Array.from(Array(hyperParameters.dbmea_segmentLengths.length), (v, i) => i),
    Array.from(Array(hyperParameters.dbmea_transferSegmentLengths.length), (v, i) => i),
    Array.from(Array(hyperParameters.dbmea_mortality_rate.length), (v, i) => i),
    Array.from(Array(hyperParameters.sa_terminationCriteria.length), (v, i) => i),
    Array.from(Array(hyperParameters.sa_temperature.length), (v, i) => i),
    Array.from(Array(hyperParameters.sa_alpha.length), (v, i) => i),
    Array.from(Array(hyperParameters.sa_length.length), (v, i) => i),
    Array.from(Array(hyperParameters.sa_optNumber.length), (v, i) => i)
];

const permutations = Utils.combineArraysRecursively(parameterIndexes);

const benchMarkResults = new BenchmarkResultsReaderTaillard;

setBenchmarkType(BENCHMARK_OPTIONS[1]);

benchMarkResults.readAll();

let actualOptimumIndex = 0;
if (myArgs.length != 0) {
    actualOptimumIndex = benchMarkResults.benchmarkAssignments[argumentBenchmarkName];
}

let selectedBenchMarkIndex = -1;
if (process.argv[3] !== undefined) {
    console.log("running benchmark item number: " + process.argv[3]);
    selectedBenchMarkIndex = Number(process.argv[3]);
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
        // run only one benchmark item
        if (selectedBenchMarkIndex >= 0 && actualBenchmarkInstanceIndex != selectedBenchMarkIndex) {
            actualBenchmarkInstanceIndex++;
            actualOptimumIndex++;
            continue;
        }
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

            const dbmea_population = hyperParameters.dbmea_population[permutations[i][0]];
            const dbmea_terminationCriteria = hyperParameters.dbmea_terminationCriteria[permutations[i][1]];
            const dbmea_clone = hyperParameters.dbmea_clones[permutations[i][2]];
            const dbmea_infection = hyperParameters.dbmea_infections[permutations[i][3]];
            const dbmea_segmentLength = hyperParameters.dbmea_segmentLengths[permutations[i][4]];
            const dbmea_transferSegmentLength = hyperParameters.dbmea_transferSegmentLengths[permutations[i][5]];
            const dbmea_mortality_rate = hyperParameters.dbmea_mortality_rate[permutations[i][6]];
            const sa_terminationCriteria = hyperParameters.sa_terminationCriteria[permutations[i][7]];
            const sa_temperature = hyperParameters.sa_temperature[permutations[i][8]];
            const sa_alpha = hyperParameters.sa_alpha[permutations[i][9]];
            const sa_length = hyperParameters.sa_length[permutations[i][10]];
            const sa_optNumber = hyperParameters.sa_optNumber[permutations[i][11]];
            console.log("parameters: ", dbmea_population, dbmea_terminationCriteria, dbmea_clone, dbmea_infection, dbmea_segmentLength, dbmea_transferSegmentLength, sa_terminationCriteria, sa_temperature, sa_alpha, sa_length, sa_optNumber);

            fs.appendFileSync(RESULTS_FILE, benchmarkName + ": parameters" + " " + dbmea_population + " " + dbmea_terminationCriteria + " " + dbmea_clone + " " + dbmea_infection + " " + dbmea_segmentLength + " " +
                dbmea_transferSegmentLength + " " + sa_terminationCriteria + " " + sa_temperature + " " + sa_alpha + " " + sa_length + " " + sa_optNumber + "\n");

            const startTime = process.hrtime();

            let dbmeaResultSolution: Solution = dbmea_sa(dbmea_population, dbmea_terminationCriteria, dbmea_clone, dbmea_infection, dbmea_segmentLength, dbmea_transferSegmentLength, dbmea_mortality_rate, sa_terminationCriteria, sa_temperature, sa_alpha, sa_length, sa_optNumber);


            optimum = dbmeaResultSolution.fitness();
            optimumJobSequence = dbmeaResultSolution.getJobSequence()
            ellapsedTime = process.hrtime(startTime);

            if (bestOptimum > optimum) {
                bestOptimum = optimum;
            }

            console.log("calculated optimum [" + i + "]: " + optimum + " benchmark optimum: " + benchmarkOptimum + " [" + ellapsedTime[0] + " sec]");

            if (benchmarkOptimum > optimum) {
                fs.appendFileSync(RESULTS_FILE, "better found !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                fs.appendFileSync("parameters: ", dbmea_population + " " + dbmea_terminationCriteria + " " + dbmea_clone + " " + dbmea_infection
                    + " " + dbmea_segmentLength + " " + dbmea_transferSegmentLength + " " + sa_terminationCriteria + " " + sa_temperature + " " + sa_alpha + " " + sa_length + " " + sa_optNumber + " \n");
                console.log("Better found !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            }
        }

        fs.appendFileSync(RESULTS_FILE, benchmarkName + ": " + bestOptimum + (bestOptimum == benchmarkOptimum ? " = " : " ") + benchmarkOptimum + " [" + ellapsedTime[0] + " sec] Job sequence: " + optimumJobSequence + "\n\n");
        actualBenchmarkInstanceIndex++;
        actualOptimumIndex++;
    }

}
const algorithmEndTime = dateFormat(new Date(), " yyyy:mm:dd  HH:MM:ss \n");
fs.appendFileSync(RESULTS_FILE, "End time: " + algorithmEndTime);
