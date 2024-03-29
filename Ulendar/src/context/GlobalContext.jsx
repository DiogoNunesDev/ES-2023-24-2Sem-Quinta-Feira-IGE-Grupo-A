import { createContext, useState } from "react";
import { csvToJson } from "../tempConverter/converter";

/**
 * Context for global data across the React application.
 * 
 * @type {React.Context<{fileHorario: File | null, urlHorario: string | null, horario: any, getHorario: Function}>}
 */

export const GlobalContext = createContext({});

/**
 * Provider component for the global context, managing and providing global state.
 * This includes management of file and URL for schedules (horario) and their respective setters.
 * 
 * The `getHorario` function handles the process of fetching and converting a CSV file 
 * to JSON, either from a File object or a URL string. It sets the 'fileHorario', 
 * 'urlHorario', and 'horario' state based on the input.
 * 
 * @param {{children: React.ReactNode}} props - Props containing children components to be wrapped by the provider.
 * @returns {JSX.Element} - The provider component wrapping its children with the GlobalContext.
 */

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
