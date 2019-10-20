/* eslint-disable */
// The two lines below are used to fix fetch undefined error https://github.com/unsplash/unsplash-js/issues/35
require('es6-promise').polyfill()
require('isomorphic-fetch')

require('dotenv/config')

const fetch = require('node-fetch')
const path = require('path')
const fs = require('fs')

const { promisify } = require('util')

const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)


export default async function (req, res) {

    if (req.method === 'GET') {
        await readFileAsync(`${process.env.CATALOG_PATH}`, {encoding: 'utf8'}, (err, fileData) => { 
            if (err) {
                console.log('Error on read '+err)
                res.status(400).send('Error on read '+err)
                return
            }
            res.send(fileData)
        })
        return
    }

    const reqData = req.body
    const WRITE_STATUS = {
        400: `Couldn't save data`,
        408: `Can't wrote file`,
        201: `Saved data successfully`,
        205: `Ok with initial file write`
    }
    
    if (!reqData) {
        res.status(500).send('Please provide data')
        return
    }

    try {
        let data = []
        const whiteData = async (data) => {
            if (data.length) {
                // Add new data
                await writeFileAsync(`${process.env.CATALOG_PATH}`, JSON.stringify(data), (err) => {
                    console.log(data.length)
                    if (err) {
                        // res.status(400).send(`Couldn't save data ${err}`)
                        return false
                    }
                    // res.send('Saved data successfully')
                    return true
                })
            } else {
                await writeFileAsync(`${process.env.CATALOG_PATH}`, JSON.stringify([{}]), (err) => {
                    if (err) {
                        // res.send(`Can't wrote file ${process.env.CATALOG_PATH}`)
                        return false
                    }
                    // res.send('ok with initial file write')
                    return true
                })
            }
        }
        await readFileAsync(`${process.env.CATALOG_PATH}`, {encoding: 'utf8'}, (err, fileData) => { 
            if (err) {
                console.log('Error on read '+err)
                if(whiteData(reqData)) {
                    res.send('Wrote initial file')
                }
            }
            data = [].concat(JSON.parse(fileData), req.body).filter((item) => Object.keys(item).length > 0)
            // res.send(`File read ok ${JSON.stringify(data)}`)
            if (whiteData(data)) {
                res.send('Ok Pal')
            } else {
                res.send('Not Ok Pal')
            }
        })
        
    } catch (error) {
        res.status(500).send(`Error message : ${error}`)
    }
}
