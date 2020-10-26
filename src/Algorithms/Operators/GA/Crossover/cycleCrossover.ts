import { Solution } from "../../../../Model/solution";
/**
 * The cycle crossover operator. Creates 2 children solutions from 2 parent solutions
 * @param {Solution[]} parents the parent solutions
 * @returns {Solution[]} the two children solution
 */
export function cycleCrossover(parents: Solution[]): Solution[] {
    ;
    let offspring: Solution[] = [];

    offspring[0] = new Solution(parents[0].permutation);
    offspring[1] = new Solution(parents[1].permutation);

    let offspringCX: Solution[] = [];
    offspringCX[0] = new Solution();
    offspringCX[1] = new Solution();
    //stores the  actual number of genes of the offspring (the indices of the first offspring, which are uploaded from the first parent)
    let indices: number[] = [];
    //determines from which parent gets the offspring the gene
    let count: number = 0;
    let i: number = 0;
    while (indices.length < offspring[0].permutation.length) {
        for (i = 0; i < offspring[0].permutation.length; i++) {


            //if the first offspring not contains the number
            if (indices.indexOf(i) == -1) {
                break;
            }
        }
        //store the first part of the copy genes
        let basis: number = offspring[0].permutation[i];
        count++;
        if (count % 2 == 1) {
            //the first offspring gets the gene of the first parent, the second offspring get the gene of the second parent
            offspringCX[0].permutation[i] = offspring[0].permutation[i];
            offspringCX[1].permutation[i] = offspring[1].permutation[i];
        } else {
            //when the circle is close
            //the first offspring gets the gene of the second parent, the second offspring get the gene of the first parent
            offspringCX[0].permutation[i] = offspring[1].permutation[i];
            offspringCX[1].permutation[i] = offspring[0].permutation[i];
        }
        let k: number = i;
        indices.push(k);
        while (true) {
            let j: number = 0;
            for (j = 0; j < offspring[0].permutation.length; j++) {
                //search for the other copy  gene part
                if (offspring[0].permutation[j] == offspring[1].permutation[k]) {
                    if (indices.indexOf(j) == -1) {
                        indices.push(j);
                        if (count % 2 == 1) {
                            offspringCX[0].permutation[j] = offspring[0].permutation[j];
                            offspringCX[1].permutation[j] = offspring[1].permutation[j];
                        } else {
                            offspringCX[0].permutation[j] = offspring[1].permutation[j];
                            offspringCX[1].permutation[j] = offspring[0].permutation[j];
                        }
                    }
                    break;
                }
            }
            //if the "circle is close"- we get all copying genes
            if (offspring[0].permutation[j] == basis) {
                break;
            } else {
                k = j;
            }
        }
    }
    return offspringCX;
}