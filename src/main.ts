import { dbmea } from "./DBMEA/dbmea";
import { Solution } from "./Model/solution";

//similar parameter setting to the paper (L. Kóczy)
//i_seg and i_rans must be lower than the length of the permutation (number of jobs)
let dbmeaResultSolution: Solution = dbmea(100, 3, 2, 40, 4, 4);
//let dbmeaResultSolution: Solution = dbmea(3, 2, 2, 4, 5, 5);
console.log(dbmeaResultSolution.fitness());


