# production-optimization-DBMEA
Problem: TOTAL TARDINESS PROBLEM ON IDENTICAL PARALLEL MACHINES
Algorothm: Dicrete Bacterial Memetic Evolutionary Algorithm
Benchmark dataset: https://sites.google.com/site/shunjitanaka/pmtt
Paper: [TA08] S. Tanaka and M. Araki. A branch-and-bound algorithm with Lagrangian relaxation to minimize total tardiness on identical parallel machines. International Journal of Production Economics 113(5), p. 446-458, 2008. DOI: 10.1016/j.ijpe.2007.10.006

Command: npm run build
Test:
        run all test: npm run test

The benchmark instances are in the 'benchmark_instances/instances' folder.
The best known results are in the 'benchmark_instances/results' folder.
To run the algorithm for each benchmark instances modify in the constants.ts file to the corresponding benchmark data
        