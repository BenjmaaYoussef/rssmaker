const functions = require("firebase-functions");
const scrapeUrl = require("./scraper.js")
const puppeteer = require('puppeteer');
const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser')
var HTMLParser = require('node-html-parser');
const RSS = require("rss")
const Firestore = require('@google-cloud/firestore');
var afterLoad = require('after-load');
const axios = require("axios")
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firestore = new Firestore({
  projectId: "rssfeeder-2f1c0",
  timestampsInSnapshots: true
});

app.post('/url', (req, res) => {
  let url = req.body.url
  async function main() {
    try {
      axios.get(url).then((response)=>{
        res.send(response.data)
      })
    } catch (err) {
      console.error(err);
    }
  }
  main()
});

app.post('/search_ready', (req, res) => {
  let url = req.body.url
  async function main() {
    try {
      axios.get("https://cloud.feedly.com/v3/search/feeds/?query=" + url).then((response)=>{
        res.send(response.data)
      })
    } catch (err) {
      console.error(err);
    }
  }
  main()
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//


function cleanTagHtml(str) {
  if (str && str.trim().length) {
    let data = [];
    let arr = str
      .replace(/<\/?[^>]+(>|$)/g, "")
      .split("&nbsp;");

    // break one line when multiple &nbsp;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] && arr[i].trim()) {
        data.push(arr[i]);
      } else if (arr[i - 1] && arr[i - 1].trim()) {
        data.push("\n");
      }
    }
    return data.join("");
  }
  return "";
}



app.post('/selectors', (req, res) => {
  const selectors = req.body
  console.log(selectors)
  let containe = selectors.postContainer
  console.log(containe)
  async function main() {
    try {
      if (selectors.readyLink) {
        firestore.collection("feeds").add({
          readyLink: selectors.readyLink,
          created: Date.now(),
          user: selectors.user
        }).then(doc => {
          console.info('stored new doc id#', doc.id);
          res.send(doc.id);
        }).catch(err => {
          console.error(err);
          res.status(404).send({
            error: 'unable to store',
            err
          });
        })
      } else {
        firestore.collection("feeds").add({
          url: selectors.url,
          postContainer: selectors.postContainer,
          title: selectors.title,
          description: selectors.description,
          user: selectors.user,
          created: Date.now()
        }).then(doc => {
          console.info('stored new doc id#', doc.id);
          res.send(doc.id);
        }).catch(err => {
          console.error(err);
          res.status(404).send({
            error: 'unable to store',
            err
          });
        })
    }
    } catch (err) {
      console.error(err);
    }
  }
  main()
});

app.get('/feed/:id', async (req, res) => {
  const id = req.params.id
  const parser = HTMLParser.parse
  const selectors = await firestore.collection("feeds")
    .doc(id)
    .get()
    .then(doc => {
    if (!(doc && doc.exists)) {
      res.status(404)
    }
    return doc.data()
  }).catch(err => {
    console.error(err);
    res.status(404)
  })
  if (selectors.readyLink) {
    axios.get(selectors.readyLink).then((response)=>{
      res.set('Content-Type', 'text/xml');
      res.send(response.data)
    })
  } else {
    
  
  console.log(selectors)
  let containe = selectors.postContainer
  console.log(containe)
  async function main() {
    try {
      const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
      const [page] = await browser.pages();

      await page.goto(selectors.url, {waitUntil: 'load', timeout: 0});
      await page.exposeFunction("cleanTagHtml", cleanTagHtml);
      const listPosts = await page.evaluate(async(selectors) => {
          /*await new Promise(r => setTimeout(r, 2000));*/
          let elements = Array.from(document.querySelectorAll(selectors.postContainer));
          let links = elements.map(element => {
              return element.innerHTML
          })
          return links;
      }, selectors);
      var list = []
      function getDifference(a, b)
      {
          var i = 0;
          var j = 0;
          var result = "";
  
          while (j < b.length)
          {
           if (a[i] != b[j] || i == a.length)
               result += b[j];
           else
               i++;
           j++;
          }
          return result;
      }
      listPosts.forEach(el => {
          list.push({
              title: parser(el).querySelector(getDifference(selectors.postContainer, selectors.title)) ? parser(el).querySelector(getDifference(selectors.postContainer, selectors.title)).textContent.replace(/[\r\n\t]/gm, '') : "",
              description: parser(el).querySelector(getDifference(selectors.postContainer, selectors.description)) ? parser(el).querySelector(getDifference(selectors.postContainer, selectors.description)).textContent.replace(/[\r\n\t]/gm, '') : ""
          })
      })
      console.log(listPosts)
      const feed = new RSS({
          title: "Your feed",
          description: "Your feed",
          author: "Benjmaa Youssef"
      })
      for (const singleEl of list) {
          feed.item({
              title: singleEl.title,
              description: singleEl.description,
          })
      }
      const xml = feed.xml({indent: true})
      res.set('Content-Type', 'text/xml');
      res.send(xml)
      await browser.close();
    } catch (err) {
      console.error(err);
    }
  }
  
  main()
}
});


exports.scrape = functions
  .runWith({
    timeoutSeconds: 120,
    memory: '512MB' || '2GB',
  })
  .https.onRequest(app);
