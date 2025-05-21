import { writeFile, readFile, unlink, mkdir, appendFile, copyFile } from 'node:fs/promises';
import logData from './logger.js'

export class FileHelper {
    #fileParams = {
        basePath: "",
        folderName: "",
        fileName: "",
        data: undefined,
    }

    constructor(fileParam = {
        basePath: "",
        folderName: "",
        fileName: "",
        data: undefined,
    }) {
        this.#fileParams = fileParam;
    }

    readFileData = () => {
        logData(this.#fileParams.data);
    }
}