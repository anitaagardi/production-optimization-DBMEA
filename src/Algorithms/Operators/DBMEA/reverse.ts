function reverse(array: number[]): number[] {
    const { length: l } = array;
    for (let i = 0; i < Math.floor(l / 2); i++) {
        const temp: number = array[i];
        array[i] = array[l - i - 1];
        array[l - i - 1] = temp;
    };
    return array;
};
/**
 * Reverse the element of an array between a position (segment)
 * @param {number[]} array the array, which segment element must be reversed
 * @param {number} start the start of the segment
 * @param {number} end the end of the segment
 * @returns {Solution} the best permutation (solution)
 */
export function reverseBetween(array: number[], start: number, end: number): number[] {
    const num: number = Math.min(end - start, array.length - start);
    array.splice(start, 0, ...reverse(array.splice(start, num)));
    return array;
}