const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()

const url = 'https://45.12.2.25/'

axios(url)
    .then(response => {
        const html = response.data
        //console.log(html)
        const $ = cheerio.load(html)
        const animes = []

        $('.bsux', html).each(function() {
            const title = $(this).find('a').attr('title')
            const url = $(this).find('a').attr('href')
            animes.push({
                title,
                url
            })
        })
        console.log(animes)
    }).catch(err => console.log(err))

app.listen(PORT, () => console.log('server running on PORT ${PORT}') )