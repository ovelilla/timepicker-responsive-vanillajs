export const dates = (() => {
    const isValidDate = (date) => {
        return date instanceof Date && !isNaN(date);
    };

    const isValidTime = (time) => {
        const regex = /^([0-1][0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
        return regex.test(time);
    };

    const timeToString = (hour, minute) => {
        return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
    };

    return {
        isValidDate,
        isValidTime,
        timeToString,
    };
})();
