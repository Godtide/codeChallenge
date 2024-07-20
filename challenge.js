

const csvFilePath='./annual-enterprise-survey-2021-financial-year-provisional-csv.csv'
const csv=require('csvtojson')

const { Parser } = require('json2csv');
const fs = require('fs');
const path = require('path');
const newCsvFilePath = path.join(__dirname, 'industry-to-value.csv');


let store = {};

csv()
.fromFile(csvFilePath)
.then((industries)=>{

    industries.forEach((industryData)=> {
             const industry = industryData.Industry_name_NZSIOC;
             const value = parseFloat(industryData.Value.replace(/,/g, ''));

//       // Ensure value is a number and non-negative
//   if (isNaN(value) || value < 1) {
//     console.warn(`Invalid value encountered for ${industry}: ${value}`);
//     value = 0; // Set invalid values to 0
//   }
            
    if (store[industry]) {
        store[industry] += value;
      } else {
        store[industry] = value;
      }
    })

    console.log(store)

      const json2csvParser = new Parser();
      const csvData = json2csvParser.parse(store);

      fs.writeFileSync(newCsvFilePath, csvData);
  
})
