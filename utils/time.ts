import {DateTime} from "luxon";

export const formatTimeDifference = (currentTime: Date, lastFetchedTime: Date): string => {
    const difference = Math.abs(currentTime.valueOf() - lastFetchedTime.valueOf()) / 1000;

    if (difference < 15) {
        return `0 ms`;
    } else if (difference < 60) {
        const seconds = Math.floor(difference);
        return `${seconds} ${seconds === 1 ? 'second' : 'seconds'}`;
    } else if (difference < 3600) {
        const minutes = Math.floor(difference / 60);
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
    } else if (difference < 86400) {
        const hours = Math.floor(difference / 3600);
        return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
    } else {
        const days = Math.floor(difference / 86400);
        return `${days} ${days === 1 ? 'day' : 'days'}`;
    }
}

export const formatCurrentDay = (inputDate: string): string => {
    const date = DateTime.fromFormat(inputDate, 'd LLLL y');
    if (date.isValid) {
        return date.toFormat('LLLL d, y');
    } else {
        return 'Invalid Date';
    }
}
