const stringyfy=(string)=>`"${string}"`;
export const dateTimeConveter=(value)=>{
    const timestampString = stringyfy(value);

    // Extract seconds using regular expression
    const secondsMatch = timestampString.match(/seconds=\s?(\d+)/);
    const seconds = secondsMatch ? parseInt(secondsMatch[1]) : null;

    // Extract nanoseconds using regular expression
    const nanosecondsMatch = timestampString.match(/nanoseconds=\s?(\d+)/);
    const nanoseconds = nanosecondsMatch ? parseInt(nanosecondsMatch[1]) : null;

    // Create timestamp object
    const timestamp = { seconds, nanoseconds };

    // Convert seconds to milliseconds
    const milliseconds = timestamp.seconds * 1000;

    // Create a new Date object with the milliseconds
    const date = new Date(milliseconds);

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
