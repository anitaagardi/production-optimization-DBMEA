# production-optimization-DBMEA
Problem: TOTAL TARDINESS PROBLEM ON IDENTICAL PARALLEL MACHINES
Algorithm: Dicrete Bacterial Memetic Evolutionary Algorithm
Comparision algorithms: Genetic Algorithm, Simulated Annealing
Benchmark dataset: https://sites.google.com/site/shunjitanaka/pmtt
Paper: [TA08] S. Tanaka and M. Araki. A branch-and-bound algorithm with Lagrangian relaxation to minimize total tardiness on identical parallel machines. International Journal of Production Economics 113(5), p. 446-458, 2008. DOI: 10.1016/j.ijpe.2007.10.006

npm install

Command:

GA:

Tanaka: npm run start:ga:tanaka

Eric:npm run start:ga:eric
 
SA:


Tanaka: npm run start:sa:tanaka

Eric:npm run start:sa:eric


DBMEA:


Tanaka: npm run start:dbmea:tanaka

Eric:npm run start:dbmea:eric

Test:
run all test:
npm run test


The benchmark instances are in the 'benchmark_instances/Eric'  and 'benchmark_instances/Tanaka' folder.
The best known results are in the 'benchmark_instances/Tanaka/results' and  'benchmark_instances/Eric/results' folder.

        