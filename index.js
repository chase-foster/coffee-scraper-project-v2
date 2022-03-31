const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const request = require('request');
const cors = require('cors'); 
const PORT = 8282;

const georgeHowellUrl = 'https://store.georgehowellcoffee.com/coffees/'


const app = express();

const links = [];

app.use(cors());



//////////////////////////////////////////////////////////////////////////////////////////////

app.get('/test', (req, res) => {

  axios(georgeHowellUrl)
  .then(response => {
      const html = response.data;
      const coffeePageHTML = cheerio.load(html);
      const coffees = [];

      coffeePageHTML('.coffeeBadge', html).each(function() {
          const coffeeName = coffeePageHTML(this).find('.coffeeBadgeBottom a').text()
          const coffeeCountry = coffeePageHTML(this).find('.country-label').text()
          const coffeeFlavors = coffeePageHTML(this).find('.flavors').text()
          const coffeeImage = coffeePageHTML(this).find('img').attr('src')

          const coffeeURL = coffeePageHTML(this).find('a').attr('href')
          const fixedCoffeeURL = 'https://store.georgehowellcoffee.com' + coffeeURL;

          coffees.push({
              coffeeImage,
              coffeeName,
              coffeeCountry,
              coffeeFlavors,
              fixedCoffeeURL
          });

          links.push((
            fixedCoffeeURL
          ))

          //console.log(links)
      });

      

  })
  .then( () => {

    for (let i = 0; i < links.length; i++) {
      console.log(links[i])
        
    }

  })
  
  .catch(err => console.log(err));

});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.get('/results', (req, res) => {

    axios(georgeHowellUrl)
    .then(response => {
        const html = response.data;
        const coffeePageHTML = cheerio.load(html);
        const coffees = [];

        coffeePageHTML('.coffeeBadge', html).each(function() {
            const coffeeName = coffeePageHTML(this).find('.coffeeBadgeBottom a').text()
            const coffeeCountry = coffeePageHTML(this).find('.country-label').text()
            const coffeeFlavors = coffeePageHTML(this).find('.flavors').text()
            const coffeeImage = coffeePageHTML(this).find('img').attr('src')

            const coffeeURL = coffeePageHTML(this).find('a').attr('href')
            const fixedCoffeeURL = 'https://store.georgehowellcoffee.com' + coffeeURL;

            coffees.push({
                coffeeImage,
                coffeeName,
                coffeeCountry,
                coffeeFlavors,
                fixedCoffeeURL
            });
        });

        res.json(coffees);

    }).catch(err => console.log(err));

});



app.listen(PORT, () => console.log(`The server has started running on port ${PORT}`));