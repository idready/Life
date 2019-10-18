/* eslint-disable */
// The two lines below are used to fix fetch undefined error https://github.com/unsplash/unsplash-js/issues/35
require('es6-promise').polyfill()
require('isomorphic-fetch')

require('dotenv/config')

const fetch = require('node-fetch')
const path = require('path')
const fs = require('fs')

export default async function (req, res) {

    const reqData = req.body
    let concatenadData = []
    if (!reqData) {
        res.status(500).send('Please provide data')
        return
    }

    try {
        let data = []
        await fs.readFile(`${process.env.CATALOG_PATH}`, {encoding: 'utf8'}, (err, fileData) => { 
            if (!err) {
                data = JSON.parse(fileData)
                console.log(typeof data)
                return
            }
            console.log('Error on read '+err)
        })

        if (data.length) {
            // Add new data
            res.send('Ok')
        } else {
            await fs.writeFile(`${process.env.CATALOG_PATH}`, JSON.stringify([{}]), (err) => {
                if (!err) {
                    res.send('ok with initial file write')
                    return
                }
                res.send(`Can't wrote file ${process.env.CATALOG_PATH}`)
            })
        }
    } catch (error) {
        res.status(500).send(`Error message : ${error}`)
    }
}
