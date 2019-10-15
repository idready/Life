/* eslint-disable */
// The two lines below are used to fix fetch undefined error https://github.com/unsplash/unsplash-js/issues/35
require('es6-promise').polyfill()
require('isomorphic-fetch')

// require('dotenv').config()
require('dotenv/config')

const fetch = require('node-fetch')
const path = require('path')
const fs = require('fs')

export default function (req, res, next) {

    const reqData = [{}] || null;
    let concatenadData = [];
    if (reqData && !reqData.length) {
        res.status(500).send('Please provide data')
        return;
    }

    concatenadData = [...reqData]
    const catalogPath = `../..${process.env.catalogPath}`
    console.log(catalogPath)
    fs.readFile(catalogPath, (err, data) => {
        if (err) {
            console.log(err)
            fs.writeFile(catalogPath, [], (error, data) => {
                if (error) {
                    throw (`Can't write original file \n ${error}`);
                }
                console.log('File write successfull')
            })
        }
        concatenadData = [].concat(concatenadData, data)
    })
    res.send('Hello world')
    next()
}
