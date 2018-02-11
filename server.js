const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((request, response, next) => {
  const now = new Date().toString();
  const log = `${now}: ${request.method} ${request.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (error) => {
    if (error) {
      console.log('Unable to append to server.log');
    }
  });

  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// }); // next() is not called. Thus maintenance will always be loaded if uncommented

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
 return text.toUpperCase();
});

app.get('/', (request, response) => {
  response.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to the home page of your brand new app!!'
  });
});

app.get('/about', (request, response) => {
  response.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (request, response) => {
  response.send({
    statusCode: 500,
    errorMessage: 'Cannot retrieve servers'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
