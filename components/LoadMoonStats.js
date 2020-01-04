export default function MoonStats () {
  return new Promise(resolve => {

    //Initialize variables
    this.PhaseName = ""
    this.PhasePercentage = ""
    this.NextFull = ""
    this.Distance = ""

    //Configure DB
    var AWS = require("aws-sdk");

    AWS.config.update({
      region: 'ap-southeast-2',
      accessKeyId: 'AKIAYQW5DLD5T64DM6X5',
      secretAccessKey: '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'
    });

    var dynamodb = new AWS.DynamoDB();

    var params = {
      RequestItems: {
        'SpaceEyeApp': {
          Keys: [
            {'ID': {S: '1'}}, //Last Updated Date
            {'ID': {S: '2'}}, //Moon Phase Name
            {'ID': {S: '3'}}, //Moon Phase Perectage
            {'ID': {S: '4'}}, //Next Full Moon
            {'ID': {S: '5'}}, //Moon Distance
          ]
        }
      }
    }

    // Read the latest date (DOES NOT GET IN ORDER)

    //Access db to get date
    dynamodb.batchGetItem(params, async function(err, data) {
      if (err) {
        console.log("Error", err);
        reject(err);
      } else {
        console.log("Success getting batch", data);
        //JavaScript counts months from 0. 0 - Jan, 11 - Dec.
        var dbDateParts = data.Responses.SpaceEyeApp.find(data => data.ID.S === '1').DATA_CONTENT.S.split('-');
        var dbDate = new Date(dbDateParts[0], dbDateParts[1], dbDateParts[2]);

        var currentDateParts = new Date();
        var currentDate = new Date(currentDateParts.getUTCFullYear(), currentDateParts.getUTCMonth(), currentDateParts.getUTCDate());

        console.log("dbdate", dbDate)
        console.log("currentdate", currentDate)

        //If up to date, read latest info
        if (currentDate > dbDate) { //correct is >. Using < for testing purposes
          console.log("TEST1111111")
          //https://www.icalendar37.net/lunar/api/?lang=en&month=1&year=2020
          
          var httpRequestString = "https://www.icalendar37.net/lunar/api/?lang=en&month=" + (currentDate.getMonth() + 1) + "&year=" + currentDate.getFullYear()
          
          try {
            var response = await fetch(
              httpRequestString,
            );
            var responseString = await response.text();
            var responseJson = JSON.parse(responseString);
            
            this.PhaseName = responseJson.phase[(currentDate.getMonth()+1)].phaseName
            this.PhasePercentage = responseJson.phase[(currentDate.getMonth()+1)].lighting //in %
            this.NextFull = ""
            this.Distance = responseJson.phase[(currentDate.getMonth()+1)].dis //in kms

            console.log("TESTSETEST", responseJson.phase[(currentDate.getMonth()+1)].phaseName);
            
            //Write new vals into db
            resolve(this);
          } catch (error) {
            console.error(error);
          }
          //Call moon api and update db
        } else {
          console.log("TEST222222")

          //Get data from db.
          this.PhaseName = data.Responses.SpaceEyeApp.find(data => data.ID.S === '2').DATA_CONTENT.S
          this.PhasePercentage = data.Responses.SpaceEyeApp.find(data => data.ID.S === '3').DATA_CONTENT.S
          this.NextFull = data.Responses.SpaceEyeApp.find(data => data.ID.S === '4').DATA_CONTENT.S
          this.Distance = data.Responses.SpaceEyeApp.find(data => data.ID.S === '5').DATA_CONTENT.S
      
          resolve(this);
        }
      }
    })
  })
}

//initialize moon object
//use current


//connect to db

//if db.date < todays date then call api and update db. Populate moon object

//else read db data. Populate moon object.



//get moonstats object

