const express = require('express');
const puppeteer = require('puppeteer');
const fs = require("fs")
var cors = require('cors');
var bodyParser = require('body-parser')
var HTMLParser = require('node-html-parser');
const RSS = require("rss")


const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors());



app.post('/url', (req, res) => {
    let url = req.body.url
    async function main() {
      try {
        const browser = await puppeteer.launch({headless: false});
        const [page] = await browser.pages();

        await page.goto(url, { waitUntil: 'networkidle0', timeout: 0 });
        const data = await page.evaluate(() => document.querySelector('*').outerHTML);

        fs.writeFileSync("data.html", data);
        res.send(data);
        await browser.close();
      } catch (err) {
        console.error(err);
      }
    }
    main()
});

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
    const parser = HTMLParser.parse
    const selectors = req.body
    console.log(selectors)
    let containe = selectors.postContainer
    console.log(containe)
    async function main() {
      try {
        const browser = await puppeteer.launch({headless: false});
        const [page] = await browser.pages();

        await page.goto(selectors.url);
        await page.exposeFunction("cleanTagHtml", cleanTagHtml);
        const listPosts = await page.evaluate(async(selectors) => {
            document.querySelector('footer').scrollIntoView();
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
        res.send(xml);
        await browser.close();
      } catch (err) {
        console.error(err);
      }
    }
    main()
});

app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});