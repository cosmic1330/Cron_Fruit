var CronJob = require("cron").CronJob;
const insertData = require("./db/methods/insertData");
const remove = require("./db/methods/remove");
const express = require("express");

// no sleep
setInterval(function () {
  request.get(
    {
      url: `https://fruit-price-line-bot.herokuapp.com/`,
    },
    (error, response, body) => {
      if (error){
        console.log('Wake up:Fail')
      }else{
        console.log('Wake up:Success')
      }
    }
  );
}, 1680000);

// cron
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
