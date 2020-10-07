export function isPermutation(permutation: number[]) {
    for (let i = 0; i < permutation.length; i++) {
        if (permutation.indexOf(i) == -1) {
            return false;
        }
    }
    return true;
}