# Flow Shop Scheduling Problem optimization with Discrete Bacterial Memetic Evolutionary Algorithm and Simulated Annealing
## Flow Shop Scheduling Problem

Flow Shop Scheduling Problem [1] is an optimization problem, where the number of jobs and machines are given. Processing times of the jobs on each machine are also known in advance. Each job must be assigned to all machines. Each machine processes a single job at a time. The objective function is to minimize of makespan of all jobs.

## Discrete Bacterial Memetic Evolutionary Algorithm
Discrete Bacterial Memetic Evolutionary Algorithm (DBMEA) [2] is a population based heuristic optimization algorithm. After generating the initial population, it performs the following operations until __stop condition__ is met: 

1. Bacterial Mutation
2. Local Search
3. Gene transfer

## Simulated Annealing Algorithm
Simulated Annealing algorithm [3] operates on a single solution. It creates a neighbor of the current solution, and if it is better than the current solution, it accepts it as current. If not better, the algorithm will only accept it with a certain probability.

For local search, our approach uses the Simulated Annealing instead of the 2-opt 3-opt technique, therefore, we gave it the following name: Discrete Bacterial Memetic Evolutionary Algorithm with Simulated Annealing (DBMEA+SA).

## Test command for the DBMEA+SA algorithm

0. Clone this repository
1. Install Node.js from https://nodejs.org/en/
2. Install dependencies of our project: `npm install`
3. Run the DBMEA+SA algorithm : `npm run start:dbmea_sa:taillard`

**advanced options:**

If you want to run only one Taillard dataset, you must specify the file name, for example:

`npm run start:dbmea_sa:taillard 1tai20_5.txt`

To run only one instance from a file use: (e.g. 5.th test case)

`npm run start:dbmea_sa:taillard 1tai20_5.txt 4`

## Test results
We used Taillard [4] benchmark data set to validate our approach. For data series, the number of jobs is between 20 and 500, number of machines is between 5 and 20. We also compared it with the results published by other authors, which are as follows: 
  * Invasive Weed Optimization (IWO) [5], 
  * HGSA Hybrid Genetic Simulated Annealing (HGSA) [6] 
  * Hybrid Genetic Algorithm (HGA) [7], 
  * Hormone Modulation Mechanism Flower Pollination Algorithm (HMM-PFA) [8].

 | Instance | Jobs x Machines | Best known | DBMEA + SA | IWO [5] | HGSA [6] | HGA [7] | HMM-PFA [8] | 
 |----------|-------|------------|------------|---------|----------|---------|-------------|  
 | Ta001 | 20 x 5 | 1278 | 1283 | 1389 | 1324 | 1449 | 1486 | 
 | Ta002 | 20 x 5 | 1359 | 1360 | - | 1442 | 1460 | 1528 | 
 | Ta003 | 20 x 5 | 1081 | 1081 | - | 1098 | 1386 | 1460 | 
 | Ta004 | 20 x 5 | 1293 | 1293 | - | 1469 | 1521 | 1588 | 
 | Ta005 | 20 x 5 | 1235 | 1235 | - | 1291 | 1403 | 1449 | 
 | Ta006 | 20 x 5 | 1195 | 1195 | - | 1391 | 1430 | 1481 | 
 | Ta007 | 20 x 5 | 1234 | 1239 | - | 1299 | 1461 | 1483 | 
 | Ta008 | 20 x 5 | 1206 | 1206 | - | 1292 | 1433 | 1482 | 
 | Ta009 | 20 x 5 | 1230 | 1230 | - | 1306 | 1398 | 1469 | 
 | Ta010 | 20 x 5 | 1108 | 1108 | - | 1233 | 1324 | 1377 | 
 | Ta011 | 20 x 10 | 1582 | 1587 | 2207 | 1713 | 1955 | 2044 | 
 | Ta012 | 20 x 10 | 1659 | 1681 | - | 1718 | 2123 | 2166 | 
 | Ta013 | 20 x 10 | 1496 | 1510 | - | 1555 | 1912 | 1940 | 
 | Ta014 | 20 x 10 | 1377 | 1384 | - | 1516 | 1782 | 1811 | 
 | Ta015 | 20 x 10 | 1419 | 1420 | - | 1573 | 1933 | 1933 | 
 | Ta016 | 20 x 10 | 1397 | 1407 | - | 1457 | 1827 | 1892 | 
 | Ta017 | 20 x 10 | 1484 | 1487 | - | 1622 | 1944 | 1963 | 
 | Ta018 | 20 x 10 | 1538 | 1552 | - | 1749 | 2006 | 2057 | 
 | Ta019 | 20 x 10 | 1593 | 1611 | - | 1624 | 1908 | 1973 | 
 | Ta020 | 20 x 10 | 1591 | 1597 | - | 1722 | 2001 | 2051 | 
 | Ta021 | 20 x 20 | 2297 | 2308 | 3226 | 2331 | 2912 | 2973 | 
 | Ta022 | 20 x 20 | 2099 | 2120 | - | 2280 | 2780 | 2852 | 
 | Ta023 | 20 x 20 | 2326 | 2349 | - | 2480 | 2922 | 3013 | 
 | Ta024 | 20 x 20 | 2223 | 2223 | - | 2362 | 2967 | 3001 | 
 | Ta025 | 20 x 20 | 2291 | 2316 | - | 2507 | 2953 | 3003 | 
 | Ta026 | 20 x 20 | 2226 | 2239 | - | 2375 | 2908 | 2998 | 
 | Ta027 | 20 x 20 | 2273 | 2291 | - | 2341 | 2970 | 3052 | 
 | Ta028 | 20 x 20 | 2200 | 2215 | - | 2279 | 2763 | 2839 | 
 | Ta029 | 20 x 20 | 2237 | 2242 | - | 2410 | 2972 | 3009 | 
 | Ta030 | 20 x 20 | 2178 | 2191 | - | 2401 | 2919 | 2979 | 
 | Ta031 | 50 x 5 | 2724 | 2724 | 3020 | 2731 | 3127 | 3160 | 
 | Ta032 | 50 x 5 | 2834 | 2848 | - | 2934 | 3438 | 3432 | 
 | Ta033 | 50 x 5 | 2621 | 2634 | - | 2638 | 3182 | 3210 | 
 | Ta034 | 50 x 5 | 2751 | 2776 | - | 2785 | 3289 | 3338 | 
 | Ta035 | 50 x 5 | 2863 | 2864 | - | 2864 | 3315 | 3356 | 
 | Ta036 | 50 x 5 | 2829 | 2832 | - | 2907 | 3324 | 3346 | 
 | Ta037 | 50 x 5 | 2725 | 2732 | - | 2764 | 3183 | 3231 | 
 | Ta038 | 50 x 5 | 2683 | 2704 | - | 2706 | 3243 | 3235 | 
 | Ta039 | 50 x 5 | 2552 | 2565 | - | 2610 | 3059 | 3070 | 
 | Ta040 | 50 x 5 | 2782 | 2783 | - | 2784 | 3301 | 3317 | 
 | Ta041 | 50 x 10 | 3025 | 3059 | 3465 | 3198 | 4251 | 4274 | 
 | Ta042 | 50 x 10 | 2892 | 2933 | - | 3020 | 4139 | 4177 | 
 | Ta043 | 50 x 10 | 2864 | 2931 | - | 3055 | 4083 | 4099 | 
 | Ta044 | 50 x 10 | 3064 | 3077 | - | 3124 | 4480 | 4399 | 
 | Ta045 | 50 x 10 | 2986 | 3041 | - | 3129 | 4316 | 4322 | 
 | Ta046 | 50 x 10 | 3006 | 3074 | - | 3293 | 4282 | 4289 | 
 | Ta047 | 50 x 10 | 3107 | 3165 | - | 3232 | 4376 | 4420 | 
 | Ta048 | 50 x 10 | 3039 | 3056 | - | 3390 | 4304 | 4318 | 
 | Ta049 | 50 x 10 | 2902 | 2949 | - | 3237 | 4162 | 4155 | 
 | Ta050 | 50 x 10 | 3091 | 3149 | - | 3251 | 4232 | 4283 | 
 | Ta051 | 50 x 20 | 3875 | 3957 | 5475 | 4105 | 6138 | 6129 | 
 | Ta052 | 50 x 20 | 3715 | 3823 | - | 3992 | 5721 | 5725 | 
 | Ta053 | 50 x 20 | 3668 | 3760 | - | 3900 | 5847 | 5862 | 
 | Ta054 | 50 x 20 | 3752 | 3823 | - | 3921 | 5781 | 5788 | 
 | Ta055 | 50 x 20 | 3635 | 3737 | - | 4020 | 5891 | 5886 | 
 | Ta056 | 50 x 20 | 3698 | 3793 | - | 3971 | 5875 | 5863 | 
 | Ta057 | 50 x 20 | 3716 | 3811 | - | 4093 | 5937 | 5962 | 
 | Ta058 | 50 x 20 | 3709 | 3793 | - | 4090 | 5919 | 5926 | 
 | Ta059 | 50 x 20 | 3765 | 3842 | - | 4107 | 5839 | 5876 | 
 | Ta060 | 50 x 20 | 3777 | 3861 | - | 4113 | 5935 | 5957 | 
 | Ta061 | 100 x 5 | 5493 | 5495 | 5839 | 5536 | 6492 | 6361 | 
 | Ta062 | 100 x 5 | 5268 | 5290 | - | 5302 | 6353 | 6212 | 
 | Ta063 | 100 x 5 | 5175 | 5213 | - | 5221 | 6148 | 6104 | 
 | Ta064 | 100 x 5 | 5014 | 5023 | - | 5044 | 6080 | 5999 | 
 | Ta065 | 100 x 5 | 5250 | 5265 | - | 5358 | 6254 | 6179 | 
 | Ta066 | 100 x 5 | 5135 | 5147 | - | 5197 | 6177 | 6056 | 
 | Ta067 | 100 x 5 | 5246 | 5262 | - | 5414 | 6257 | 6221 | 
 | Ta068 | 100 x 5 | 5106 | 5134 | - | 5130 | 6225 | 6109 | 
 | Ta069 | 100 x 5 | 5454 | 5504 | - | 5546 | 6443 | 6355 | 
 | Ta070 | 100 x 5 | 5328 | 5342 | - | 5480 | 6441 | 6365 | 
 | Ta071 | 100 x 10 | 5770 | 5825 | 6815 | 5964 | 8115 | 8055 | 
 | Ta072 | 100 x 10 | 5349 | 5414 | - | 5596 | 7986 | 7853 | 
 | Ta073 | 100 x 10 | 5676 | 5727 | - | 5796 | 8057 | 8016 | 
 | Ta074 | 100 x 10 | 5781 | 5892 | - | 5928 | 8327 | 8328 | 
 | Ta075 | 100 x 10 | 5467 | 5567 | - | 5748 | 7991 | 7936 | 
 | Ta076 | 100 x 10 | 5303 | 5330 | - | 5446 | 7823 | 7773 | 
 | Ta077 | 100 x 10 | 5595 | 5689 | - | 5679 | 7915 | 7846 | 
 | Ta078 | 100 x 10 | 5617 | 5695 | - | 5723 | 7939 | 7880 | 
 | Ta079 | 100 x 10 | 5871 | 5969 | - | 5934 | 8226 | 8131 | 
 | Ta080 | 100 x 10 | 5845 | 5903 | - | 5998 | 8186 | 8092 | 
 | Ta081 | 100 x 20 | 6286 | 6407 | 9405 | 6395 | 10745 | 10675 | 
 | Ta082 | 100 x 20 | 6241 | 6334 | - | 6433 | 10655 | 10562 | 
 | Ta083 | 100 x 20 | 6329 | 6480 | - | 6689 | 10672 | 10587 | 
 | Ta084 | 100 x 20 | 6306 | 6409 | - | 6419 | 10630 | 10588 | 
 | Ta085 | 100 x 20 | 6377 | 6518 | - | 6536 | 10548 | 10506 | 
 | Ta086 | 100 x 20 | 6437 | 6530 | - | 6527 | 10700 | 10623 | 
 | Ta087 | 100 x 20 | 6346 | 6462 | - | 6542 | 10827 | 10793 | 
 | Ta088 | 100 x 20 | 6481 | 6608 | - | 6712 | 10863 | 10801 | 
 | Ta089 | 100 x 20 | 6358 | 6443 | - | 6760 | 10751 | 10703 | 
 | Ta090 | 100 x 20 | 6465 | 6629 | - | 6621 | 10794 | 10747 | 
 | Ta091 | 200 x 10 | 10868 | 11002 | 11783 | 11120 | 15739 | 15225 | 
 | Ta092 | 200 x 10 | 10494 | 10627 | - | 10658 | 15534 | 14990 | 
 | Ta093 | 200 x 10 | 10922 | 11088 | - | 11224 | 15755 | 15257 | 
 | Ta094 | 200 x 10 | 10889 | 11004 | - | 11075 | 15842 | 15103 | 
 | Ta095 | 200 x 10 | 10524 | 10666 | - | 10793 | 15692 | 15088 | 
 | Ta096 | 200 x 10 | 10331 | 10475 | - | 10467 | 15622 | 14976 | 
 | Ta097 | 200 x 10 | 10857 | 11057 | - | 11394 | 15877 | 15277 | 
 | Ta098 | 200 x 10 | 10731 | 10851 | - | 11011 | 15733 | 15133 | 
 | Ta099 | 200 x 10 | 10438 | 10520 | - | 10725 | 15573 | 14985 | 
 | Ta100 | 200 x 10 | 10676 | 10850 | - | 10786 | 15803 | 15213 | 
 | Ta101 | 200 x 20 | 11294 | 11483 | 15217 | 11642 | 20148 | 19531 | 
 | Ta102 | 200 x 20 | 11420 | 11535 | - | 11683 | 20539 | 19942 | 
 | Ta103 | 200 x 20 | 11446 | 11603 | - | 11930 | 20511 | 19759 | 
 | Ta104 | 200 x 20 | 11347 | 11634 | - | 11791 | 20461 | 19759 | 
 | Ta105 | 200 x 20 | 11311 | 11549 | - | 11728 | 20339 | 19697 | 
 | Ta106 | 200 x 20 | 11282 | 11512 | - | 11690 | 20501 | 19826 | 
 | Ta107 | 200 x 20 | 11456 | 11670 | - | 11958 | 20680 | 19946 | 
 | Ta108 | 200 x 20 | 11415 | 11672 | - | 11730 | 20614 | 19872 | 
 | Ta109 | 200 x 20 | 11343 | 11517 | - | 12138 | 20300 | 19784 | 
 | Ta110 | 200 x 20 | 11422 | 11573 | - | 12084 | 20437 | 19768 | 
 | Ta111 | 500 x 20 | 26189 | 26652 | 30730 | 26859 | 49095 | 46121 | 
 | Ta112 | 500 x 20 | 26629 | 27115 | - | 27220 | 49461 | 46627 | 
 | Ta113 | 500 x 20 | 26458 |  | - | 27511 | 48777 | 46013 | 
 | Ta114 | 500 x 20 | 26549 | 26974 | - | 26912 | 49283 | 46396 | 
 | Ta115 | 500 x 20 | 26404 |  | - | 26930 | 48950 | 46251 | 
 | Ta116 | 500 x 20 | 26581 | 27004 | - | 27354 | 49533 | 46490 | 
 | Ta117 | 500 x 20 | 26461 | 26874 | - | 26888 | 48943 | 46043 | 
 | Ta118 | 500 x 20 | 26615 |  | - | 27229 | 49277 | 46368 | 
 | Ta119 | 500 x 20 | 26083 | 26601 | - | 28103 | 49207 | 46240 | 
 | Ta120 | 500 x 20 | 26527 |  | - | 27290 | 49092 | 46292 | 


## References
[1] Johnson, S. M. (1954). Optimal two‐and three‐stage production schedules with setup times included. Naval research logistics quarterly, 1(1), 61-68.  
[2] Kóczy, L. T., Földesi, P., & Tüű-Szabó, B. (2018). Enhanced discrete bacterial memetic evolutionary algorithm-An efficacious metaheuristic for the traveling salesman optimization. Information Sciences, 460, 389-400.  
[3] Malek, M., Guruswamy, M., Pandya, M., & Owens, H. (1989). Serial and parallel simulated annealing and tabu search algorithms for the traveling salesman problem. Annals of Operations Research, 21(1), 59-84.  
[4] E. Taillard, "Benchmarks for basic scheduling problems", EJOR 64(2):278-285, 1993  
[5] Zhou, Y., Chen, H., & Zhou, G. (2014). Invasive weed optimization algorithm for optimization no-idle flow shop scheduling problem. Neurocomputing, 137, 285-292.  
[6] Wei, H., Li, S., Jiang, H., Hu, J., & Hu, J. (2018). Hybrid genetic simulated annealing algorithm for improved flow shop sche-duling with makespan criterion. Applied Sciences, 8(12), 2621.  
[7] Tseng, L. Y., & Lin, Y. T. (2010). A hybrid genetic algorithm for no-wait flowshop scheduling problem. International Journal of Production Economics, 128(1), 144-152.  
[8] Qu, C., Fu, Y., Yi, Z., & Tan, J. (2018). Solutions to no-wait flow shop scheduling problem using the flower pollination algorithm based on the hormone modulation mechanism. Complexity, 2018.  
