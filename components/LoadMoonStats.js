export default function MoonStats () {
  return new Promise(resolve => {

    // Initialize variables
    this.PhaseName = ""
    this.PhasePercentage = ""
    this.NextFull = ""
    this.Distance = ""

    // Configure DB
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
            {'ID': {S: '1'}}, // Last Updated Date
            {'ID': {S: '2'}}, // Moon Phase Name
            {'ID': {S: '3'}}, // Moon Phase Perectage
            {'ID': {S: '4'}}, // Next Full Moon
            {'ID': {S: '5'}}, // Moon Distance
          ]
        }
      }
    }

    // Accessing DB for data
    dynamodb.batchGetItem(params, async function(err, data) {
      if (err) {
        console.error("Error occured during DB read for Moon data.", err);
        reject(err);
      } else {
        // JavaScript counts months from 0. 0 - Jan, 11 - Dec.
        var dbDateParts = data.Responses.SpaceEyeApp.find(data => data.ID.S === '1').DATA_CONTENT.S.split('-');
        var dbDate = new Date(Date.UTC(dbDateParts[0], dbDateParts[1] - 1, dbDateParts[2]));

        var currentDateParts = new Date();
        var currentDate = new Date(Date.UTC(currentDateParts.getUTCFullYear(), currentDateParts.getUTCMonth(), currentDateParts.getUTCDate()));

        // If DB up to date, read latest data from DB. Otherwise get latest data from API and update DB.
        if (currentDate > dbDate) { 
          // Calling API
          var httpRequestString = "https://www.icalendar37.net/lunar/api/?lang=en&month=" + (currentDate.getMonth() + 1) + "&year=" + currentDate.getFullYear()
          
          try {
            var response = await fetch(
              httpRequestString,
            );
            var responseString = await response.text();
            var responseJson = JSON.parse(responseString);
            
            this.PhaseName = responseJson.phase[(currentDate.getMonth()+1)].phaseName
            this.PhasePercentage = String(responseJson.phase[(currentDate.getMonth()+1)].lighting) //in %
            this.NextFull = 'TEST'
            this.Distance = String(responseJson.phase[(currentDate.getMonth()+1)].dis)//in kms
            
            var formatDate = currentDate.getUTCFullYear() + "-" + (currentDate.getUTCMonth() + 1) + "-" + currentDate.getUTCDate()

            // Write new vals into DB
            var params2 = {
              RequestItems: {
                "SpaceEyeApp": [
                  {
                    PutRequest: {
                      Item: {
                        'ID': { 'S': '1'},
                          'DATA_CONTENT': { 'S': formatDate },
                          'DATA_NAME': { 'S': 'LAST_UPDATED' }
                      }
                    }
                  },
                  {
                    PutRequest: {
                      Item: {
                        'ID': { 'S': '2'},
                          'DATA_CONTENT': { 'S': this.PhaseName },
                          'DATA_NAME': { 'S': 'MOON_PHASE_NAME' }
                      }
                    }
                  },
                  {
                    PutRequest: {
                      Item: {
                        'ID': { 'S': '3'},
                          'DATA_CONTENT': { 'S': this.PhasePercentage },
                          'DATA_NAME': { 'S': 'MOON_PHASE_PERCENTAGE' }
                      }
                    }
                  },
                  {
                    PutRequest: {
                      Item: {
                        'ID': { 'S': '4'},
                          'DATA_CONTENT': { 'S': this.NextFull },
                          'DATA_NAME': { 'S': 'MOON_NEXT_FULL' }
                      }
                    }
                  },
                  {
                    PutRequest: {
                      Item: {
                        'ID': { 'S': '5'},
                          'DATA_CONTENT': { 'S': this.Distance },
                          'DATA_NAME': { 'S': 'MOON_DISTANCE' }
                      }
                    }
                  }
                ]
              }
            };

            dynamodb.batchWriteItem(params2, function(err, data) {
              if (err) {
                // Error when trying to update DB. Forward issue.
                console.error("Error occured when trying to update DB for Moon data.", err);
              } else {
                // Successfully updated DB.
                console.log("Successfully updated DB for Moon data.", data);
              }
            });
            resolve(this);
          } catch (error) {
            console.error("Error occured during Moon data API call.", error);
          }
        } else {
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
