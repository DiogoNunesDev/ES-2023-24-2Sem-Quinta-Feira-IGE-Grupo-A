import { createContext, useState } from "react";
import { csvToJson } from "../tempConverter/converter";

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  const [fileHorario, setFileHorario] = useState(null);
  const [urlHorario, setUrlHorario] = useState(null);
  const [horario, setHorario] = useState(null);

  const getHorario = async (file) => {
    if (file instanceof File) {
      const reader = new FileReader();
      reader.onload = function (event) {
        setFileHorario(file);
        setHorario(csvToJson(event.target.result));
        console.log(csvToJson(event.target.result));
      };
      reader.readAsText(file);
    } else if(typeof file === 'string'){
      console.log(1);
      setUrlHorario(file);
      try {
        const response = await fetch(`https://corsproxy.io/?${file}`, {
          method: 'GET', 
          responseType: 'text',
        });
    
        if (!['text/csv', 'application/csv', 'text/plain'].includes(response.headers.get('content-type'))) {
          throw new Error('The URL did not return a CSV file.');
        }
    
        const csvText = await response.text();
        setHorario(csvToJson(csvText));
      } catch (error) {
        console.error('Error fetching or processing the CSV:', error);
      }
    };
  }

  return (
    <GlobalContext.Provider
      value={{ fileHorario, urlHorario, horario, getHorario }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
