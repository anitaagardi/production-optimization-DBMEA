/**
 * Generation a combination from an elements of an array with given length
 * @param {number[]} size the length of the permutation
 * @param {number} size the length of the combination
 * @returns {number[]} the combinations (with a given length) of the elements of the array
 */
export function combinations(array: number[], size: number) {
    let result_set = [], result;

    for (let x = 0; x < Math.pow(2, array.length); x++) {
        result = [];
        let i = array.length - 1;
        do {
            if ((x & (1 << i)) !== 0) {
                result.push(array[i]);
            }
        } while (i--);

        if (result.length == size) {
            result_set.push(result);
        }
    }
    for (let i = 0; i < result_set.length; i++) {
        result_set[i].sort();
    }
    return result_set;
}