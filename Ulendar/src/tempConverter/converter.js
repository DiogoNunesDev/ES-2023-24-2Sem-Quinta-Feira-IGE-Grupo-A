/**
 * Converts a CSV string to a JSON string.
 * 
 * This function takes a string in CSV format and converts it into a JSON string.
 * The first line of the CSV is expected to contain the headers, which are used as keys in the resulting JSON objects.
 * Each subsequent line in the CSV represents a new object.
 * 
 * The CSV data is expected to be delimited with semicolons (;). Each line is split into an array of values based on this delimiter.
 * The function matches each value with its corresponding header after trimming whitespace.
 * Only lines with the same number of elements as the headers are processed to ensure data consistency.
 * 
 * @param {string} csv - The CSV string to be converted into JSON.
 * @returns {string} A JSON string representing the CSV data.
 */


export function csvToJson(csv) {
    const lines = csv.split("\n");
    const result = [];
    const headers = lines[0].split(";");

    for (let i = 1; i < lines.length; i++) {
        let obj = {};
        let currentline = lines[i].split(";");
        if (currentline.length === headers.length) {
            for (let j = 0; j < headers.length; j++) {
                obj[headers[j].trim()] = currentline[j].trim();
            }
            result.push(obj);
        }
    }
    return JSON.stringify(result, null, 2);
}