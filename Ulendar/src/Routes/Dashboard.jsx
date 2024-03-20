/**
 * Dashboard component for the React application.
 * This component serves as the main user interface where various elements can be displayed.
 * 
 * The core structure is a 'div' with a flex display style to create a flexible layout.
 * The 'flexGrow: 1' style ensures that the 'div' occupies the available space in its container.
 * 
 * This component can be expanded to include more elements and functionalities as needed.
 * 
 * @returns {JSX.Element} - The rendered Dashboard component.
 */
import React, { useContext, useEffect, useRef , useState} from 'react';
import { GlobalContext } from "../context/GlobalContext";
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import 'tabulator-tables/dist/css/tabulator.min.css';

function Dashboard() {
  const { horario } = useContext(GlobalContext);
  const tableRef = useRef(null);
  const [columnVisibility, setColumnVisibility] = useState({
    "Curso": true,
    "Unidade Curricular": true,
    "Turno": true,
    "Turma": true,
    "Inscritos no turno": true,
    "Dia da semana": true,
    "Hora início da aula": true,
    "Hora fim da aula": true,
    "Data da aula": true,
    "Características da sala pedida para a aula": true,
    "Sala atribuída à aula": true,
    "Semana do Ano": true,
    "Semana do Semestre": true
  });
  const [selectedColumn, setSelectedColumn] = useState('');

  const [filter, setFilter] = useState({});
  const [filterMode, setFilterMode] = useState("AND");

  function parseDate(dateString) {
    if (!dateString || typeof dateString !== 'string') {
      return null; // Return null if the input is not valid
    }
    const parts = dateString.split("/");
    if (parts.length === 3) {
      return new Date(parts[2], parts[1] - 1, parts[0]);
    } else {
      return null; // Return null if the date string is not in the expected format
    }
  }

  // Utility function to calculate week of the year
  function getWeekOfYear(dateString) {
    
    const date = parseDate(dateString);
    if (!date) {
      return -1;
    }
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }

  const semesterStartDateString = new Date("2024-02-04"); // Set the start date of the semester
  const semesterStartDate = parseDate(semesterStartDateString);

  function getWeekOfSemester(dateString) {
    const date = parseDate(dateString);
    if (!date) {
      return -1;
    }
    const weekDiff = getWeekOfYear(dateString) - getWeekOfYear(semesterStartDateString);
    return weekDiff >= 0 ? weekDiff + 1 : -1;
  }

  /*
  Custom filter function to filter data based on the filter object and filter mode. [AND | OR]
  */ 
  const customFilter = (data) => {
    return data.filter(row => {
      const filterEntries = Object.entries(filter);
      if (filterMode === "AND") {
        return filterEntries.every(([key, value]) => {
          return row[key]?.toString().toLowerCase().includes(value.toLowerCase());
        });
      } else { // OR logic
        return filterEntries.some(([key, value]) => {
          return row[key]?.toString().toLowerCase().includes(value.toLowerCase());
        });
      }
    });
  };

  useEffect(() => {
    if (!tableRef.current) return;

    if (tableRef.current) {
      // Initialize Tabulator table
      tableRef.current.tabulator = new Tabulator(tableRef.current, {
        data: horario,           // Load row data from array
        layout: "fitColumns",    // Fit columns to width of table
        responsiveLayout: "hide",// Hide columns that don't fit on the table
        addRowPos: "top",        // When adding a new row, add it to the top of the table
        history: true,           // Allow undo and redo actions on the table
        pagination: "local",     // Paginate the data
        paginationSize: 18,      // Allow 20 rows per page of data
        paginationCounter: "rows", // Display count of paginated rows in footer
        movableColumns: true,    // Allow column order to be changed
        initialSort: [           // Set the initial sort order of the data
            { column: "Unidade Curricular", dir: "asc" },
        ],
        initialHeaderFilter: false, // Do not apply header filters by default
        columns: [
          { title: "Curso", field: "Curso", sorter: "string", headerFilter: "input", maxWidth: 100},
          { title: "Unidade Curricular", field: "Unidade Curricular", sorter: "string", headerFilter: "input", maxWidth: 150 },
          { title: "Turno", field: "Turno", sorter: "string", headerFilter: "input", maxWidth: 100 },
          { title: "Turma", field: "Turma", sorter: "string", headerFilter: "input", maxWidth: 100 },
          { title: "Inscritos no turno", field: "Inscritos no turno", sorter: "number", headerFilter: "input", maxWidth: 130 },
          { title: "Dia da semana", field: "Dia da semana", sorter: "string", hozAlign: "center", headerFilter: "input", maxWidth: 130 },
          { title: "Hora início da aula", field: "Hora início da aula", sorter: "string", hozAlign: "center", headerFilter: "input", maxWidth: 130 },
          { title: "Hora fim da aula", field: "Hora fim da aula", sorter: "string", hozAlign: "center", headerFilter: "input", maxWidth: 130 },
          { title: "Data da aula", field: "Data da aula", sorter: "date", hozAlign: "center", headerFilter: "input", maxWidth: 130 },
          { title: "Características da sala pedida para a aula", field: "Características da sala pedida para a aula", sorter: "string", hozAlign: "center", headerFilter: "input", maxWidth: 150 },
          { title: "Sala atribuída à aula", field: "Sala atribuída à aula", sorter: "string", hozAlign: "center", headerFilter: "input", maxWidth: 100 },
          {
            title: "Semana do Ano",
            field: "Semana do Ano",
            mutator: (value, data) => {
              const dateValue = data["Data da aula"];
              const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
              if (datePattern.test(dateValue)) {
                return getWeekOfYear(dateValue);
              } else {
                return -1; // Return -1 if the date is not in the expected format
              }
            },
            sorter: "number",
            headerFilter: "input",
            maxWidth: 100
          },
          {
            title: "Semana do Semestre",
            field: "Semana do Semestre",
            mutator: (value, data) => {
              const dateValue = data["Data da aula"];
              if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateValue)) {
                return getWeekOfSemester(dateValue);
              } else {
                return -1; // Return -1 if the date is not in the expected format
              }
            },
            sorter: "number",
            headerFilter: "input",
            maxWidth: 100
          },
        ],
      });
      tableRef.current.tabulator.on("headerFilterChanged", (column) => {
        const field = column.getField();
        const value = column.getHeaderFilterValue() || '';
        setFilter(prev => ({ ...prev, [field]: value }));

        // Apply custom filter
        const filteredData = customFilter(horario);
        tableRef.current.tabulator.setData(filteredData);
      });
    }
  }, [horario, filter, filterMode]); // Re-run effect when `horario` changes

  const toggleFilterMode = () => {
    setFilterMode(prevMode => prevMode === "AND" ? "OR" : "AND");
  };

  const handleToggleColumn = (fieldName) => {
    if (tableRef.current && tableRef.current.tabulator) {
      const column = tableRef.current.tabulator.getColumn(fieldName);
      if (column) {
        column.toggle();
      } else {
        console.error(`Column with field name '${fieldName}' not found`);
      }
    }
  };
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => setFilterMode(prevMode => prevMode === "AND" ? "OR" : "AND")}>
          Toggle Filter Mode (Current: {filterMode})
        </button>
      </div>
      <div>
        <select value={selectedColumn} onChange={e => setSelectedColumn(e.target.value)}>
          <option value="">Select a Column</option>
          {Object.keys(columnVisibility).map((fieldName) => (
            <option key={fieldName} value={fieldName}>{fieldName}</option>
          ))}
        </select>
        <button onClick={() => handleToggleColumn(selectedColumn)}>
          Toggle Selected Column
        </button>
      </div>
      <div ref={tableRef} style={{ width: '100%' }}></div>
    </div>


  );
  
}

export default Dashboard;