# The Kriptoken Trading Platform
[Website - Heroku](https://kolayik-umut-celik.herokuapp.com/)

### Introduction
A digital currency trading platform called Kriptoken will be developed. There are 5 currencies on the platform, such as BTC, LTC, ETH, DASH, XRP. These currencies can be exchanged between them. The current prices are as follows and will not change.

| Currency      | Value          |
| ------------- |:--------------:|
| 1 ETH         | 0.04791411 BTC |
| 1 LTC         | 0.00592855 BTC |
| 1 DASH        | 0.06756612 BTC |
| 1 XRP         | 0.00002001 BTC |    

### Requirements
- Users can be registered only by name, surname, e-mail address, and password are accepted for the registration. Email sending and verification are not required
- 10000 XRP will be given to each newly registered user
- The user will be able to buy another currency by selling any of the currencies in his account. 0.25% trading commission will be charged for each transaction
- Users will be able to list the currencies in their account
- Users will be able to list the current values of their currencies

### Technical Information
- A RESTful API that can be authenticated with e-mail and password will be developed
- Any Node.js framework can be used but Express.js is a plus 
- Any JS framework can be used to interface but React is a plus 
- Any CSS framework can be used
- Using TypeScript is a plus
- Use Mongodb for database
- Responses of endpoints and naming can be done according to your own standards
- You are expected to implement [these screens](https://www.figma.com/proto/6pU7dzyEECwANNrAoa4k3R/Screens?node-id=1%3A254&viewport=558%2C225%2C0.2134941816329956&scaling=min-zoom) with HTML + CSS
- Responsive design

#### As a result, there should be five endpoints that perform the following tasks:
- Register
- Login/Auth
- Buy / Sell
- Show account information
- List all the currencies

### Objectives:
- The code must be opened in this repo as PR
- Code quality, framework dominance, performance, commit messages and in-code documentation will be highly considered
- The project must be running on [Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)

