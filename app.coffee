express = require 'express'

app = module.exports = express.createServer()

app.configure( ->
  app.set 'views', __dirname + '/views'
  app.set 'view engine', 'jade'
  app.use express.compiler(
    src: __dirname + '/src'
    dest: __dirname + '/public'
    enable: ['coffeescript']
  )
  app.use express.bodyParser()
  app.use express.methodOverride()
  #app.use express.cookieParser()
  #app.use express.session({ secret: 'foobar' })
  app.use(require('stylus').middleware(
    src: __dirname + '/src'
    dest: __dirname + '/public'
  ))
  app.use app.router
  app.use express.static(__dirname + '/public')
)

app.configure 'development', ->
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }))


app.configure 'production', ->
  app.use express.errorHandler()


app.get '/', (req, res) ->
  res.render('index', {
    title: 'ORLY'
  })

app.get '/controls/:module', (req, res) ->
  res.render('controls/' + req.params.module, {layout: false})

app.get('/tests', (req, res) ->
    res.render('tests', {
        title: 'Tests'
        layout: false
    })
)

app.listen process.argv[2] or 8080
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env)
