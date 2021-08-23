var CronJob = require("cron").CronJob;
const insertData = require("./db/methods/insertData");
const remove = require("./db/methods/remove");
const express = require("express");

// cron
var clock = new CronJob(
  "0 29 * * * *",
  async function () {
    const { db } = await connectToDatabase();
    const collection = db.collection("echo");
    const result = await collection.insert({ time: new Date() });
    console.log('時間到囉! app起床!');
  },
  null,
  true,
  "Asia/Taipei"
);
clock.start();

let removeArr = ["0 0 8 * * *", "0 0 11 * * *"];
let insertArr = ["0 1 8 * * *", "0 1 11 * * *"];

removeArr.forEach((element) => {
  var job = new CronJob(
    element,
    async function () {
      await remove();
      console.log("remove");
    },
    null,
    true,
    "Asia/Taipei"
  );
  job.start();
});

insertArr.forEach((element) => {
  var job = new CronJob(
    element,
    async function () {
      await insertData();
      console.log("insert");
    },
    null,
    true,
    "Asia/Taipei"
  );
  job.start();
});

// server
const app = express();
app.get("/", function (req, res) {
  res.send("<h1>Hello World!</h1>");
});
app.listen(process.env.PORT || 3000, () => {
  console.log("running");
});
