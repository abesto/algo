express = require 'express'
assets = require 'connect-assets'
jsPaths = require 'connect-assets-jspaths'

app = module.exports = express()

app.configure( ->
  app.set 'views', __dirname + '/views'
  app.set 'view engine', 'jade'
  app.use assets()
  jsPaths assets
  app.use express.bodyParser()
  app.use express.methodOverride()
  #app.use express.cookieParser()
  #app.use express.session({ secret: 'foobar' })
  app.use app.router
  app.use express.static(__dirname + '/public')
)

app.configure 'development', ->
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }))


app.configure 'production', ->
  app.use express.errorHandler()


app.get '/', (req, res) ->
  res.render('index', {
    title: 'Algorithms and Data structures',
    layout: 'layout'
  })

app.get '/controls/:module', (req, res) ->
  res.render('controls/' + req.params.module, {layout: false})

app.get('/tests', (req, res) ->
    res.render('tests', {
        title: 'Tests'
        layout: false
    })
)

port = process.argv[2] or 8080
addr = process.argv[3] or '127.0.0.1'
app.listen port, addr
console.log("Express server listening on port %d in %s mode", port, app.settings.env)
