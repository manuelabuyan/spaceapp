// export default MoonStats2 = {
//   defPhaseName: "",
//   defPhasePercentage: "",
//   defNextFull: "",
//   defDistance: "",

//   get phaseName() {
//     return this.defPhaseName;
//   },

//   get phasePercentage() {
//     return this.defPhasePercentage;
//   },

//   get nextFull() {
//     return this.defNextFull;
//   },

//   get distance() {
//     return this.defDistance;
//   },
  
// }

export default function MoonStats () {
  return new Promise(resolve => {
    this.PhaseName = ""
    this.PhasePercentage = ""
    this.NextFull = ""
    this.Distance = ""

    var AWS = require("aws-sdk");

    AWS.config.update({
      region: 'ap-southeast-2',
      accessKeyId: 'AKIAYQW5DLD5T64DM6X5',
      secretAccessKey: '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'
    });

    var dynamodb = new AWS.DynamoDB();

    // Read latest date
    var params = {
      TableName: 'SpaceEyeApp',
      Key: {
        'ID': {S: '1'}
      }
    };

    dynamodb.getItem(params, function(err, data) {
      if (err) {
        console.log("Error", err);
        reject(err);
      } else {
        console.log("Success", data);

        //JavaScript counts months from 0. 0 - Jan, 11 - Dec.
        var dbDateParts = data.Item.DATA_CONTENT.S.split('-');
        var dbDate = new Date(dbDateParts[0], dbDateParts[1], dbDateParts[2]);

        var currentDateParts = new Date();
        var currentDate = new Date(currentDateParts.getUTCFullYear(), currentDateParts.getUTCMonth(), currentDateParts.getUTCDate());

        if (currentDate < dbDate) { //correct is >. Using < for testing purposes
          console.log("TEST1111111")
          //Call moon api and update db
        } else {
          //Get data from db.
          var params2 = {
            RequestItems: {
              'SpaceEyeApp': {
                Keys: [
                  {'ID': {S: '2'}},
                  {'ID': {S: '3'}},
                  {'ID': {S: '4'}},
                  {'ID': {S: '5'}},
                ]
              }
            }
          }
          
          dynamodb.batchGetItem(params2, function(err, data2) {
            if (err) {
              console.log("Error", err);
              reject(err);
            } else {
              console.log("Success getting batch.");
              this.PhaseName = data2.Responses.SpaceEyeApp[0].DATA_CONTENT.S
              this.PhasePercentage = data2.Responses.SpaceEyeApp[1].DATA_CONTENT.S
              this.NextFull = data2.Responses.SpaceEyeApp[2].DATA_CONTENT.S
              this.Distance = data2.Responses.SpaceEyeApp[3].DATA_CONTENT.S
            }
            resolve(this)
          });
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