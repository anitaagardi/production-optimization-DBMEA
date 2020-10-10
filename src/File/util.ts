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
}