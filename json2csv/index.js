const argv = require('yargs').argv;

const inputFileName = argv._[0];
const outputFileName = argv._[1];

console.log(inputFileName, outputFileName);

const { readFile, writeFile } = require('fs').promises;

async function parseJSONFile (fileName) {
    try {
      const file = await readFile(fileName);
      return JSON.parse(file);
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  }

  function arrayToCSV (data) {
    csv = data.map(row => Object.values(row));
    csv.unshift(Object.keys(data[0]));
    return csv.join('\n');
  }

  async function writeCSV (fileName, data) {
    try {
        await writeFile(fileName, data, 'utf8'); 
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  }

  (async () => {
    const data = await parseJSONFile(inputFileName);
    const CSV = arrayToCSV(data);
    await writeCSV(outputFileName, CSV);
  console.log(`Successfully converted ${outputFileName}!`);
})();