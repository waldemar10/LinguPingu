const mongoose = require("mongoose");
const urionline =process.env.MONGODB_URI;
const urioffline = "mongodb://0.0.0.0:27017/LinguPingu";

const connectDB = async () => {
  console.log("Connecting to database...");

  await mongoose
    .connect(urionline)
    //.connect(urioffline)
    .then(() => console.log("Success"))
    .catch((err) => console.log("Error connecting to database:\n", err))  
};
module.exports = connectDB;


// alte version
/*
async function run() {
  try {
    const database = mongoose.db("LinguPingu");
    const grammar = database.collection("Grammar");

    createData(grammar, [
      { theme: "EverdayLife",
        titel: "Basic greetings",
        en: "Good afternoon, it's nice to see you again.",
        err_en: "morning; was; saw; back; too", 
        de: "Guten Tag, es freut mich, dich wiederzusehen.",
        lvl: "A1" },
    ]);

    //readData(vokabel, {german: "Apfel"});

    //updateData(vokabel, {german: "Kirsche"}, {$set: {english: "cherry4"}});

    //deleteData(vokabel, {german: "Birne"});
  }
   finally {
    // Ensures that the client will close when you finish/error
  }
} */


/* function callbackFunction(result, message = "") {
  if (message !== "") {
    if (!Array.isArray(result)) {
      console.log(message + ":" + result);
    } else {
      for (data in result) {
        console.log(result[data]);
      }
      console.log(message);
    }
  }
}

function createData(collection, data, callback = callbackFunction) {
  if (!Array.isArray(data)) {
    collection.insertOne(data, function (error, result) {
      if (error) {
        throw error;
      } else {
        callback(result, "data insertet");
      }
    });
  } else {
    collection.insertMany(data, function (error, result) {
      if (error) {
        throw error;
      } else {
        callback(result, data.length + "data insertet");
      }
    });
  }
}

function readData(collection, query = {}, callback = callbackFunction) {
  collection.find(query).toArray(function (error, result) {
    if (error) {
      throw error;
    } else {
      callback(result, "found" + result.length + "results");
    }
  });
}

function updateData(
  collection,
  query = {},
  values = {},
  callback = callbackFunction
) {
  collection.updateMany(query, values, function (error, result) {
    if (error) {
      throw error;
    } else {
      callback("", result.result.nModifiesd + "dataset(s) updated");
    }
  });
}

function deleteData(collection, query = {}, callback = callbackFunction) {
  collection.deleteMany(query, function (error, result) {
    if (error) {
      throw error;
    } else {
      callback("", result.result.n + " dataset(s) deleted");
    }
  });
}
 */