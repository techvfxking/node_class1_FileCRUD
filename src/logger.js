import { formatDate } from "./datefns.js";
/**
 * With this function we can log the data with the timestamp
 * @see {@link returnTimeStamp}: With this function we are generating the timestamp
 * @param {*} data: The Data that we want to log
 * @param {*} type: What type of the log it is, like Error, Information etc.
 */
const logData = (data, type = "") => {
    const timeStamp = returnTimeStamp();
    
    if(data === undefined)
        data = "";

    switch(type){
        case "info".toLowerCase():
            console.log(`${timeStamp} ::: ${data}`);
            break;
        case "error".toLowerCase():
            console.error(`${timeStamp} ::: ${data}`);
            break;
        default:
            console.log(`${timeStamp} ::: ${data}`);
            break;
    }
    
}

export const returnTimeStamp = () => {
    //return `[${new Date().toLocaleString()}]`;

    const date = new Date();
    const format = "yyyy-MM-dd hh:mm:ss:zz tt";

    return `${formatDate(date, format)}`;
}

export default logData;