// const https = require('https')
const http = require('http')
const fs = require('fs')
const path = require('path')
const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const bodyParser = require('body-parser')

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')

config.dev = process.env.NODE_ENV !== 'production'

async function start() {
    // Init Nuxt.js
    const nuxt = new Nuxt(config)

    const { host, port } = nuxt.options.server

    const options = {
        key: fs.readFileSync(path.join(__dirname, '/../key.pem')),
        cert: fs.readFileSync(path.join(__dirname, '/../cert.pem'))
    }

    // Build only in dev mode
    if (config.dev) {
        const builder = new Builder(nuxt)
        await builder.build()
    } else {
        await nuxt.ready()
    }
    // Middlewares
    // Give nuxt middleware to express
    app.use(nuxt.render)
    // app.use(bodyParser.urlencoded())
    app.use(bodyParser.json())

    const server = http.createServer(options, app)
    // const server = https.createServer(options, app)

    // Listen the server
    server.listen(port, host)
    consola.ready({
        message: `Server listening on http://${host}:${port}`,
        badge: true
    })
}
start()
