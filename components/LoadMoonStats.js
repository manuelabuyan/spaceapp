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


export default function MoonStats() {
  // this.phaseName
  // this.phasePercentage
  // this.nextFull
  // this.distance
  var MoonStatsObject = {
    PhaseName: "",
    PhasePercentage: "",
    NextFull: "",
    Distance: "",
  }

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
    } else {
      console.log("Success", data.Item);

      //JavaScript counts months from 0. 0 - Jan, 11 - Dec.
      var dbDateParts =data.Item.DATA_CONTENT.S.split('-');
      var dbDate = new Date(dbDateParts[0], dbDateParts[1], dbDateParts[2]);

      var currentDateParts = new Date();
      var currentDate = new Date(currentDateParts.getUTCFullYear(), currentDateParts.getUTCMonth(), currentDateParts.getUTCDate());

      if (currentDate > dbDate) {
        console.log("TEST1111111")
        //Call moon api and update db
      } else {
        console.log("TEST22222")
        //Get data from db.

      }

    }
  });

  //if (data.Item.DATA_CONTENT.S)

    // var params = {
  //   RequestItems: {
  //     'SpaceEyeApp': {
  //       Keys: [
  //         {'ID': {S: '1'}},
  //         {'ID': {N: '2'}},
  //         {'KEY_NAME': {N: 'KEY_VALUE_3'}}
  //       ],
  //       ProjectionExpression: 'KEY_NAME, ATTRIBUTE'
  //     }
  //   }
  // };

  return MoonStatsObject

}

//initialize moon object
//use current


//connect to db

//if db.date < todays date then call api and update db. Populate moon object

//else read db data. Populate moon object.



//get moonstats object