import { writeFile, readFile, unlink, mkdir, appendFile, copyFile, access, constants } from 'node:fs/promises';
import logData from './logger.js'

export class FileHelper {
    #fileParams = {
        basePath: "",
        folderName: "",
        fileName: "",
        data: undefined,
    }

    setBasePath = (path = "") => {
        this.#fileParams.basePath = path;
    }

    setfolderName = (folderName = "") => {
        this.#fileParams.folderName = folderName;
    }

    setfileName = (fileName = "") => {
        this.#fileParams.fileName = fileName;
    }

    setData = (data = "") => {
        this.#fileParams.data = data;
    }

    checkDirectoryStatus = async (folderPath = undefined) => {
        try {
            await access(folderPath || this.#fileParams.basePath, constants.F_OK);
            return true;
        } catch (error) {
            logData(error, "error");
            return false;
        }
    }

    createDirectory = async () => {
        try {
            const folderPath = `${this.#fileParams.basePath}\\${this.#fileParams.folderName}`;
            if (!await this.checkDirectoryStatus(folderPath)) {
                await mkdir(folderPath, { recursive: true });
            }
            return true
        } catch (error) {
            logData(error, "error");
            return false;
        }
    }

    createTextFile = async () => {
        try {
            const fullFilePath = `${this.#fileParams.basePath}\\${this.#fileParams.folderName}\\${this.#fileParams.fileName}.txt`;
            const data = this.#fileParams.data;
            await writeFile(fullFilePath, data, "utf-8");
            return true
        } catch (error) {
            logData(error, "error");
            return false;
        }

    }

    readFileData = async () => {
        const fullFilePath = `${this.#fileParams.basePath}\\${this.#fileParams.folderName}\\${this.#fileParams.fileName}.txt`;
        const data = await readFile(fullFilePath, { encoding: "utf-8" });
        return data;
    }
}