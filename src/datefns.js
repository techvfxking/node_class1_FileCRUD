export const formatDate = (date, format = "") => {
    const dateObj = new Date(date);

    const pad = (num = 0) => num.toString().padStart(2, '0');

    const date_ = dateObj.getDate();
    const dateDouble_ = pad(date_);

    const month_ = dateObj.getMonth() + 1;
    const monthDouble_ = pad(month_);

    const year_ = dateObj.getFullYear().toString();

    const hours_ = dateObj.getHours();
    const smallHours_ = pad(hours_ % 12 === 0 ? 12 : hours_ % 12);
    const largeHours_ = pad(hours_);
    const isAM = hours_ < 12;

    const minutes_ = pad(dateObj.getMinutes());
    const seconds_ = pad(dateObj.getSeconds());
    const milliSeconds_ = pad(dateObj.getMilliseconds());
    
    const tt_ = isAM ? "AM" : "PM";

    const monthStrings = {
        "01": "Jan",
        "02": "Feb",
        "03": "Mar",
        "04": "Apr",
        "05": "May",
        "06": "Jun",
        "07": "Jul",
        "08": "Aug",
        "09": "Sep",
        "10": "Oct",
        "11": "Nov",
        "12": "Dec"
    };

    const map = {
        "yyyy": year_,
        "MMM": monthStrings[monthDouble_],

        "dd": dateDouble_,
        "DD": dateDouble_,
        "d": date_,
        "D": date_,

        "MM": monthDouble_,
        "M": month_,

        "hh": smallHours_,
        "HH": largeHours_,

        "mm": minutes_,
        "ss": seconds_,
        "zz": milliSeconds_,
        "tt": tt_,
    };

    // Sort the keys by length in descending order
    const sortedKeys = Object.keys(map).sort((a, b) => b.length - a.length);
    const pattern = new RegExp(sortedKeys.join("|"), "g");

    format = format.replace(pattern, match => map[match]);

    return format;
};
