const express = require('express')
const next = require('next')

const compression = require('compression')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()

    if (!dev) {
      server.use(compression()) //gzip
    }
    server.get('/p/:id', (req, res) => {
      const actualPage = '/detail'
      const queryParams = { id: req.params.id }
      app.render(req, res, actualPage, queryParams)
    })
    server.get('/Blog/:id', (req, res) => {
      const actualPage = '/Blog'
      console.log(req.params.id)
      const queryParams = { id: req.params.id }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(4322, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost 4322')
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })