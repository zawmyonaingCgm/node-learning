import { rejects } from 'assert';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { EventEmitter } from 'events';

//callback
// readFile('resources/sample.txt', 'utf8', (err, data) => {
//     if(err) {
//         console.log("Error occured when reading the file: ", err);
//         return;
//     }
//     console.log('Fole content ', data);
// });

//promise
// readFile('resources/sample.txt', 'utf8')
//     .then(data => console.log('File... ', data))
//     .catch(err => console.log('Error occur... ', err));

// console.log("Reading file asynchronously...")


// async function readingFile() {
//     try {
//         const data = await readFile('resources/sample.txt', 'utf8');
//         console.log ("data ", data);
//     } catch(error) {
//         console.log('Error ', error);
//     }
// }

// readingFile();

//Promise.all(), Promise.race(), Promise.allSettled()
//Promise.all()
// const delaly = (ms, value) => new Promise(resolve => setTimeout(() => resolve(value), ms));

// const p1 = delaly(3000, "First");
// const p2 = delaly(2000, "Second");
// const p3 = delaly(1500, "Third");

// const result = await Promise.all([p1, p2, p3]);
// console.log('All result', result);
// console.log("Running other code while file is being read...")


//Promise.race()
// const fast = new Promise(reject => setTimeout(() => reject('Fast!'), 5000));
// const slow = new Promise(reject => setTimeout(() => reject('Slow!'), 3000));
// const winner = await Promise.race([fast, slow]);
// try{
//     console.log('Winner', winner);
 
// } catch(error) {
// console.log("error occur while racing, ", error);
// }

//Promise.allSettled()
const promises = [
    Promise.resolve('OK'),
    Promise.reject('Fail'),
    Promise.resolve("Done")
];

const emitter = new EventEmitter();
emitter.on("greet", (name) => {
    console.log(`Hello, ${name}`);
});

emitter.emit('greet', 'Zaw Zaw');

const result = await Promise.allSettled(promises);
console.log(result);
