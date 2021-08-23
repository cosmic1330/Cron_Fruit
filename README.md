## Deploy Heroku
```cmd
heroku login
heroku create cron-fruit
heroku git:remote -a cron-fruit
git push heroku master

heroku logs --tail
```

## Prevent your app from sleeping
You can use [kaffeine](http://kaffeine.herokuapp.com/) or [uptimerobot](https://uptimerobot.com/#features).