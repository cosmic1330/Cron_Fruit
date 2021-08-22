var CronJob = require("cron").CronJob;
const insertData = require("./db/methods/insertData");
const remove = require("./db/methods/remove");
const express = require("express");

// cron
var job1 = new CronJob(
  "0 0 12 * * *",
  function () {
    remove();
  },
  null,
  true,
  "Asia/Taipei"
);
job1.start();

var job2 = new CronJob(
  "0 1 12 * * *",
  function () {
    insertData();
  },
  null,
  true,
  "Asia/Taipei"
);
job2.start();


var job3 = new CronJob(
  "0 0 9 * * *",
  function () {
    remove();
  },
  null,
  true,
  "Asia/Taipei"
);
job3.start();

var job4 = new CronJob(
  "0 1 9 * * *",
  function () {
    insertData();
  },
  null,
  true,
  "Asia/Taipei"
);
job4.start();

// server
const app = express();
app.get("/", function (req, res) {
  res.send("<h1>Hello World!</h1>");
});
app.listen(process.env.PORT || 3000, () => {
  console.log("running");
});
