/* eslint-disable */
// The two lines below are used to fix fetch undefined error https://github.com/unsplash/unsplash-js/issues/35
require('es6-promise').polyfill()
require('isomorphic-fetch')

require('dotenv/config')

const fetch = require('node-fetch')
const path = require('path')
const fs = require('fs')

export default function (req, res, next) {

    console.log(req.body)
    const reqData = [{}] || null;
    let concatenadData = [];
    if (reqData && !reqData.length) {
        res.status(500).send('Please provide data')
        return;
    }

    concatenadData = [...reqData]
    console.log(process.env.CATALOG_PATH)
    fs.readFile(process.env.CATALOG_PATH, (err, data) => {
        if (!err) {
            fs.writeFile(`${process.env.CATALOG_PATH}`, [], (err, data) => {
                if (err) {
                    throw (`Can't write original file \n ${err}`)
                }
                console.log('File write successfull')
            })
        }
        concatenadData = [].concat(concatenadData, data)
        res.json(concatenadData)
        return
    })
    res.send('Hello world')
    next()
}
