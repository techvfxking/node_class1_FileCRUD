import { stdin as input, stdout as output } from "node:process";
import { createInterface } from "node:readline/promises";
import { FileHelper } from "./file.helper.js";
import logData from "./logger.js";

export class IOHelper {
    #io = createInterface({ input, output });
    #basePath = "";
    #folderName = "";
    #fileName = "";
    #data = "";

    startProcess = async () => {
        const welcomeMessage = `Hello, this is a Node Js console application
        \nWhere we can read, write and update a file
        \nby just following the options in the screen\n`;
        logData(`
            \n${welcomeMessage}
        `);

        //Asking Questions
        const beginJourneyStatus = await this.#io.question("Do you want to continue?\nYes or No...\n");
        if (beginJourneyStatus !== "Yes")
            process.exit(0);

        const fileHelper = new FileHelper();

        this.#basePath = await this.#io.question("Enter the base folder path...\n");
        fileHelper.setBasePath(this.#basePath);

        const basePathStatus = await fileHelper.checkDirectoryStatus();
        if (!basePathStatus) {
            logData(`
            \nUnable to verify folder, stopping the process, retry later\n
        `);
            process.exit(0);
        }

        this.#folderName = await this.#io.question("Please enter the folderName\n");
        fileHelper.setfolderName(this.#folderName);

        logData("Creating directory...\n");

        const folderStatus = await fileHelper.createDirectory();
        if (!folderStatus) {
            logData("Folder creation failed, stopping the process, retry later...\n");
            process.exit(0);
        }

        logData(`Directory created ${this.#basePath}\\${this.#folderName}...\n`);

        this.#fileName = await this.#io.question("Enter the fileName only without extension\n");
        fileHelper.setfileName(this.#fileName);

        this.#data = await this.#io.question("Enter some text that you want write on the file...\n");
        fileHelper.setData(this.#data);

        const fileCreationStatus = await fileHelper.createTextFile();
        if (!fileCreationStatus) {
            logData("File creation failed, stopping the process, retry later...\n");
            process.exit(0);
        }

        logData(`File created ${this.#basePath}\\${this.#folderName}\\${this.#fileName}.txt...\n`);
        const readFileStatus = await this.#io.question("Do you want to read the file? Yes or No: \n");
        if (readFileStatus !== "Yes") {
            logData("Stopping the process, retry later...\n");
            process.exit(0);
        }

        const fileData = await fileHelper.readFileData();
        logData(`Here is your data\n
                ${fileData}`);


        const startOverStatus = await this.#io.question("Do you want to start over or exit? Yes or No: \n");
        if (startOverStatus !== "Yes") {
            logData("Stopping the process, retry later...\n");
            process.exit(0);
        }

        await this.startProcess();



    }

}