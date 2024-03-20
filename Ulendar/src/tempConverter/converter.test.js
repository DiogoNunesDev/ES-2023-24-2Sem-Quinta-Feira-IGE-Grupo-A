// FILEPATH: /Users/kevinparesh/Documents/GitHub/ES-2023-24-2Sem-Quinta-Feira-IGE-Grupo-A/Ulendar/src/tempConverter/converter.test.js
import { csvToJson } from './converter';

describe('csvToJson', () => {
    test('should convert csv to json correctly', () => {
        const csv = 'name;age\nJohn Doe;30\nJane Doe;25';
        const expectedJson = '[\n  {\n    "name": "John Doe",\n    "age": "30"\n  },\n  {\n    "name": "Jane Doe",\n    "age": "25"\n  }\n]';
        expect(csvToJson(csv)).toBe(expectedJson);
    });

    test('should handle csv with extra spaces correctly', () => {
        const csv = ' name ; age \n John Doe ; 30 \n Jane Doe ; 25 ';
        const expectedJson = '[\n  {\n    "name": "John Doe",\n    "age": "30"\n  },\n  {\n    "name": "Jane Doe",\n    "age": "25"\n  }\n]';
        expect(csvToJson(csv)).toBe(expectedJson);
    });

    test('should handle csv with missing values correctly', () => {
        const csv = 'name;age\nJohn Doe;30\nJane Doe;';
        const expectedJson = '[\n  {\n    "name": "John Doe",\n    "age": "30"\n  }\n]';
        expect(csvToJson(csv)).toBe(expectedJson);
    });

    test('should return empty array for empty csv', () => {
        const csv = '';
        const expectedJson = '[]';
        expect(csvToJson(csv)).toBe(expectedJson);
    });
});