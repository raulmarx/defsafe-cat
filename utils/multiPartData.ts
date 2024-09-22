import { type MultiPartData } from 'h3';
const FILE_KEYS = ['name', 'filename', 'type', 'data'];

const isFile = (data: MultiPartData) => {
    return FILE_KEYS.every((key) => key in data);
};

const parseMultipart = (data?: MultiPartData[]) => {
    const arr = (Array.isArray(data) ? data : []) as MultiPartData[];
    const result = arr.reduce((prev: Record<string, any>, curr: any) => {
        prev[String(curr.name)] = isFile(curr) ? curr : curr.data.toString('utf8');
        return prev;
    }, {}); // Adicionando o valor inicial como um objeto vazio
    return result;
};

export default parseMultipart;
