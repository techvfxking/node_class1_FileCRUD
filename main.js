import { IOHelper } from "./src/input.output.helper.js";

const main = () => {
    const obj = new IOHelper();
    obj.startProcess().then(v => {});
}

main();