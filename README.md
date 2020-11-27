# production-optimization-DBMEA
Problem: TOTAL TARDINESS PROBLEM ON IDENTICAL PARALLEL MACHINES
Algorithm: Dicrete Bacterial Memetic Evolutionary Algorithm
Comparision algorithms: Genetic Algorithm, Simulated Annealing
Benchmark dataset: https://sites.google.com/site/shunjitanaka/pmtt
Paper: [TA08] S. Tanaka and M. Araki. A branch-and-bound algorithm with Lagrangian relaxation to minimize total tardiness on identical parallel machines. International Journal of Production Economics 113(5), p. 446-458, 2008. DOI: 10.1016/j.ijpe.2007.10.006

npm install

Command:

GA (running all dataset):

Tanaka: npm run start:ga:tanaka

Taillard:npm run start:ga:taillard
 
SA (running all dataset):


Tanaka: npm run start:sa:tanaka

Taillard:npm run start:sa:taillard


DBMEA (running all dataset):


Tanaka: npm run start:dbmea:tanaka

Taillard:npm run start:dbmea:taillard


DBMEA_SA (running all dataset):


Tanaka: npm run start:dbmea_sa:tanaka

Taillard: npm run start:dbmea_sa:taillard


----------------------------------------------------

To run each taillard dataset, you must specify the file name, for example :

npm run start:dbmea_sa:taillard 1tai20_5.txt

----------------------------------------------------

Test:
run all test:
npm run test

----------------------------------------------------

The benchmark instances are in the 'benchmark_instances/Taillard'  and 'benchmark_instances/Tanaka' folder.
The best known results are in the 'benchmark_instances/Tanaka/results' and  'benchmark_instances/Taillard/results' folder.

        