var table = new Tabulator("#example-table", {
    height: "311px", // set height of table (optional)
    layout: "fitColumns", // fit columns to width of table (optional)
});

document.getElementById('csv-file').addEventListener('change', function(event) {
    var file = event.target.files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
        var csv = e.target.result;
        processData(csv);
    };

    reader.readAsText(file);
});

function processData(csv) {
    var lines = csv.split("\n");
    var result = [];
    var headers = lines[0].split(";").map(h => ({ title: h, field: h }));

    for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split(";");

        for (var j = 0; j < headers.length; j++) {
            obj[headers[j].field] = currentline[j];
        }

        result.push(obj);
    }

    table.setColumns(headers); // set column headers
    table.setData(result); // set data to table
}

function setTableHeight() {
    var windowHeight = window.innerHeight;
    var desiredTableHeight = windowHeight - 20; // You can adjust this offset
    table.setHeight(desiredTableHeight + "px");
}

var table = new Tabulator("#example-table", {
    layout: "fitColumns",
});

setTableHeight(); // Set initial table height

window.addEventListener('resize', function() {
    setTableHeight(); // Update table height on window resize
});