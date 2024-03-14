function csvToJson(csv) {
    const lines = csv.split("\n");
    const result = [];
    const headers = lines[0].split(";");

    for (let i = 1; i < lines.length; i++) {
        let obj = {};
        let currentline = lines[i].split(";");
        if (currentline.length === headers.length) { // Ensure the row has the same number of columns as headers
            for (let j = 0; j < headers.length; j++) {
                obj[headers[j].trim()] = currentline[j].trim();
            }
            result.push(obj);
        }
    }
    return JSON.stringify(result, null, 2);
}