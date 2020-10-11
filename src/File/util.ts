import * as fs from 'fs';

export class Utils {
    /**
     * Gets all the files recursivelly from a path
     * @param dir starting directory
     */
    static getAllFiles(dirPath, arrayOfFiles) {
        let files = fs.readdirSync(dirPath);

        arrayOfFiles = arrayOfFiles || [];

        files.forEach(file => {
            if (fs.statSync(dirPath + "/" + file).isDirectory()) {
                arrayOfFiles = this.getAllFiles(dirPath + "/" + file, arrayOfFiles);
            } else {
                arrayOfFiles.push(dirPath + "/" + file);
            }
        })

        return arrayOfFiles;
    }

    /**
     * Calculate all the permutations of a vector
     * @param elements input vector
     */
    static permutations(elements) {
        let ret = [];

        for (let i = 0; i < elements.length; i = i + 1) {
            let rest = this.permutations(elements.slice(0, i).concat(elements.slice(i + 1)));

            if (!rest.length) {
                ret.push([elements[i]])
            } else {
                for (let j = 0; j < rest.length; j = j + 1) {
                    ret.push([elements[i]].concat(rest[j]))
                }
            }
        }
        return ret;
    }

    static combineArraysRecursively(array_of_arrays) {
        // First, handle some degenerate cases...
        if (!array_of_arrays) {
            // Or maybe we should toss an exception...?
            return [];
        }

        if (!Array.isArray(array_of_arrays)) {
            // Or maybe we should toss an exception...?
            return [];
        }

        if (array_of_arrays.length == 0) {
            return [];
        }

        for (let i = 0; i < array_of_arrays.length; i++) {
            if (!Array.isArray(array_of_arrays[i]) || array_of_arrays[i].length == 0) {
                // If any of the arrays in array_of_arrays are not arrays or are zero-length array, return an empty array...
                return [];
            }
        }

        // Done with degenerate cases...
        let outputs = [];
        function permute(arrayOfArrays, whichArray = 0, output = "") {
            arrayOfArrays[whichArray].forEach((array_element) => {
                if (whichArray == array_of_arrays.length - 1) {
                    // Base case...
                    outputs.push(output + array_element);
                }
                else {
                    // Recursive case...
                    permute(arrayOfArrays, whichArray + 1, output + array_element);
                }
            });/*  forEach() */
        }
        permute(array_of_arrays);
        return outputs;
    };
}