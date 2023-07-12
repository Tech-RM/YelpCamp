const stringyfy=(string)=>`"${string}"`;

export const convertDateAndTimeToMilisecs=(dateAndTime)=>{
    const timestampString = stringyfy(dateAndTime);

    // Extract seconds using regular expression
    const secondsMatch = timestampString.match(/seconds=\s?(\d+)/);
    const seconds = secondsMatch ? parseInt(secondsMatch[1]) : null;

    // Extract nanoseconds using regular expression
    const nanosecondsMatch = timestampString.match(/nanoseconds=\s?(\d+)/);
    const nanoseconds = nanosecondsMatch ? parseInt(nanosecondsMatch[1]) : null;

    // Create timestamp object
    const timestamp = { seconds, nanoseconds };

    // Convert seconds to milliseconds
    return timestamp.seconds * 1000;
}

export const milisecToYearConverter=(Milisec)=>{
    // Create a new Date object with the milliseconds
    const date = new Date(Milisec);

    // Extract the components of the date
    const newYear = date.getFullYear();
    const newMonth = date.getMonth() + 1; // Months are zero-indexed, so add 1
    const newDay = date.getDate();
    const newHours = date.getHours();
    const newMinutes = date.getMinutes();
    const newSeconds = date.getSeconds();

    // Create a formatted string
    const formattedDate = `${newDay.toString().padStart(2, '0')}-${newMonth.toString().padStart(2, '0')}-${newYear}`;
    const formattedTime = `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}`;

    return `${formattedDate}, ${formattedTime}`;
}

export const dateTimeConveter=(value)=>{
    const milliseconds=convertDateAndTimeToMilisecs(value);
    return milisecToYearConverter(milliseconds);
}

export const findoutDaysDifference=(createdAt)=>{
    const milliseconds=convertDateAndTimeToMilisecs(createdAt);

    // Calculate the difference in milliseconds
    const currentDate = new Date();
    const difference = currentDate.getTime() - milliseconds;

    const newYear = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
    const newMonth = Math.floor((difference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    const newDay = Math.floor((difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    const newHours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const newMinutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const newSeconds = Math.floor((difference % (1000 * 60)) / 1000);

    return `${newYear} Year ${newMonth} Months ${newDay} Days ${newHours} Hours ${newMinutes} Minutes ${newSeconds} Seconds ago`;
}
