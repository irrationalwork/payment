if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const stripeSecretKey=process.env.STRIPE_SECRET_KEY
const stripePublicKey=process.env.STRIPE_PUBLIC_KEY
// console.log(stripeSecretKey,stripePublicKey);

const express = require('express');
const app = express();
const body=require('body-parser');
const stripe = require('stripe')(stripeSecretKey)
const fs=require('fs');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/shop', function(req, res) {
    fs.readFile('items.json', function(error, data) {
      if (error) {
        res.status(500).end()
      } else {
        res.render('shop.ejs', {
          // ERROR HERE, THE STRIPE IS GETTING RENDERED TO SHOP PAGE NOT TO CART PAGE;
          stripePublicKey: stripePublicKey,
          items: JSON.parse(data)
        })
      }
    })
  })
//test 1;
  // app.get('/shop', function(req, res) {
  //   fs.readFile('items.json', function(error, data) {
  //     if (error) {
  //       res.status(500).end()
  //     } else {
  //       res.render('cart.jes', {
  //         // ERROR HERE, THE STRIPE IS GETTING RENDERED TO SHOP PAGE NOT TO CART PAGE;
  //         stripePublicKey: stripePublicKey,
  //         items: JSON.parse(data)
  //       })
  //     }
  //   })
  // })


  // app.get('/cart', function(req, res) {
  //   fs.readFile('items.json', function(error, data) {
  //     if (error) {
  //       res.status(500).end()
  //     } else {
  //       res.render('cart.ejs', {
  //         // ERROR HERE, THE STRIPE IS GETTING RENDERED TO SHOP PAGE NOT TO CART PAGE;
  //         stripePublicKey: stripePublicKey,
  //         items: JSON.parse(data)
  //       })
  //     }
  //   })
  // })

app.listen(3000)