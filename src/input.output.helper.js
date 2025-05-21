import { stdin as input, stdout as output } from "node:process";
import { Interface, createInterface } from "node:readline/promises";
import { } from "readline/promises";
import logData from "./logger.js";
import { FileHelper } from "./file.helper.js";

export class IOHelper {
    #io = createInterface({ input, output });

    startProcess = async () => {
        const as = await this.#io.question("Hello sourav!\nHow was your day?");
        logData(as);

        const fH = new FileHelper({
            data: as
        });
        const yesNo = await this.#io.question("Do You want to read the data?\n Yes or No...");
        if (yesNo === "Yes")
            fH.readFileData();
    }


}