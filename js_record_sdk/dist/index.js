import { readFromRecordFile } from './record_io.js';
import { readFile } from 'fs';
const pathToBin = process.argv[2];
if (!pathToBin) {
    console.log(`usage: ${process.argv[0]} ${process.argv[1]} <path-to-binary-record>`);
    process.exit(1);
}
console.log('reading from file "' + pathToBin + '"');
readFile(pathToBin, (err, data) => {
    if (err) {
        console.error(err.message);
        process.exit(2);
    }
    const ab = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
    const parsedRecord = readFromRecordFile(ab);
    if (!parsedRecord) {
        console.error('invalid record file');
        process.exit(3);
    }
    console.dir(parsedRecord, { depth: null });
});
