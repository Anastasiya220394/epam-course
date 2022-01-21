const inputFileName = process.argv[2]; 
const outputFileName = process.argv[3];

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
    let result = [];
    result.push(Object.keys(data[0]));
    result.push(Object.values(data[0]));
    data.shift();

    for (let i = 0; i < data.length; i++) {
      let arr = [];
      for (let j = 0; j < result[0].length; j++) {
        const key = result[0][j];
        if(data[i][key]) {
          arr.push(data[i][key]);
        } else {
          arr.push('');
       }
      }
      result.push(arr);
    }
    return result.join('\n');  
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
