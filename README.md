# giron-api
Giron Entrepreneur server-side api

## Deployment

Using Heroku CLI. Make sure [Heroku](https://devcenter.heroku.com/articles/heroku-cli#install-the-heroku-cli) is installed

Login to heroku using `heroku login` with username `gabriel.laliberte.96@gmail.com`

Link this project's git repository with heroku by creating a `heroku` remote.
Assuming existing git repo:
```bash
heroku git:remote -a giron-api
```

Push changes to deploy on the heroku remote
```bash
git add .
git commit -am "message"
git push heroku main
```

Twilio recovery code
22KWDBWEXUQTHP44CKJWY6LT