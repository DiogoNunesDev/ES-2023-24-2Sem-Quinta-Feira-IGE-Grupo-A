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
import React, { useContext, useEffect, useRef } from 'react';
import { GlobalContext } from "../context/GlobalContext";
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import 'tabulator-tables/dist/css/tabulator.min.css';

function Dashboard() {
  const { horario } = useContext(GlobalContext);
  const tableRef = useRef(null);

  useEffect(() => {
    if (tableRef.current) {
      // Initialize Tabulator table
      new Tabulator(tableRef.current, {
        data: horario,           // Load row data from array
        layout: "fitColumns",    // Fit columns to width of table
        responsiveLayout: "hide",// Hide columns that don't fit on the table
        addRowPos: "top",        // When adding a new row, add it to the top of the table
        history: true,           // Allow undo and redo actions on the table
        pagination: "local",     // Paginate the data
        paginationSize: 7,       // Allow 7 rows per page of data
        paginationCounter: "rows", // Display count of paginated rows in footer
        movableColumns: true,    // Allow column order to be changed
        initialSort: [           // Set the initial sort order of the data
            { column: "Unidade Curricular", dir: "asc" },
        ],
        columns: [               // Define the table columns
            { title: "Curso", field: "Curso", editor: "input" },
            { title: "Unidade Curricular", field: "Unidade Curricular", editor: "input" },
            { title: "Turno", field: "Turno", editor: "input" },
            { title: "Turma", field: "Turma", editor: "input" },
            { title: "Inscritos no turno", field: "Inscritos no turno", width: 130, editor: "input" },
            { title: "Dia da semana", field: "Dia da semana", width: 130, hozAlign: "center" },
            { title: "Hora início da aula", field: "Hora início da aula", width: 130, hozAlign: "center" },
            { title: "Hora fim da aula", field: "Hora fim da aula", width: 130, hozAlign: "center" },
            { title: "Data da aula", field: "Data da aula", width: 130, sorter: "date", hozAlign: "center" },
            { title: "Características da sala pedida para a aula", field: "Características da sala pedida para a aula", width: 150, hozAlign: "center", editor: "input" },
            { title: "Sala atribuída à aula", field: "Sala atribuída à aula", width: 90, hozAlign: "center", editor: "input" },
        ],
      });
    }
  }, [horario]); // Re-run effect when `horario` changes

  return (
    <div style={{ display: 'flex', flexGrow: 1 }}>
      <div ref={tableRef} style={{ width: '100%' }}></div>
    </div>
  );
  
}

export default Dashboard;