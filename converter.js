const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const jsonToCsv = (jsonData)=> {
  const csvWriter = createCsvWriter({
    path: "output.csv",
    header: [
      { id: "temperature", title: "temperature" },
      { id: "mode", title: "mode" },
      { id: "swing", title: "swing" },
      { id: "fan", title: "fan" },
      { id: "frequency", title: "frequency" },
      { id: "unique_cycle", title: "unique_cycle" },
      { id: "code", title: "code" },
    ],
  });

  const singleRemoteData = jsonData.singleRemote[0]?.data;
  const records = [];

  try {
    singleRemoteData.forEach((item) => {
      const acDataParts = item.acData.split(",");
      const temperature = parseInt(acDataParts[0], 10);
      const fanData = acDataParts[3];
      const swingData = acDataParts[2];
      const frequency = parseInt(item.frequency, 10);

      if (frequency > 30000 && !isNaN(temperature)) {
        let fan, swing;

        // set fan value
        switch (fanData) {
          case "L":
            fan = 25;
            break;
          case "M":
            fan = 50;
            break;
          case "H":
            fan = 75;
            break;
          case "A":
            fan = 100;
            break;
        }

        // set swing value
        switch (swingData) {
          case "A":
            swing = 1;
            break;
          case "F":
            swing = 0;
            break;
        }

        // push in our record
        records.push({
          temperature: temperature,
          mode: acDataParts[1],
          swing: swing,
          fan: fan,
          frequency: frequency,
          unique_cycle: item.uniqueCycle,
          code: item.code,
        });
      }
    });
  } catch (err) {
    console.log("single Remote Data is not exist", err);
  }

  csvWriter
    .writeRecords(records)
    .then(() => console.log("CSV file has been written"));
}

module.exports = jsonToCsv;
