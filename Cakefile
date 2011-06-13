{exec} = require 'child_process'
util = require 'util'
fs = require 'fs'

APPNAME = 'algo'
SILENT = false

run = (cmd, desc, cont) ->
  title = desc ? cmd
  if not SILENT then util.log title

  exec cmd, (error, stdout, stderr) ->
    if error
      util.log "\"#{title}\" ended with error.n\nSTDOUT:\n#{stdout}\n\nSTDERR:\n#{stderr}\n\nError object:\n\"#{error}\""
    else
      if not SILENT then util.log "\"#{title}\" finished. STDOUT:\n#{stdout}"
      cont?()
# eof run

build = (type, cont) ->
  run "mkdir algo/css -p && stylus algo/stylus -o algo/css", "Compiling Stylus stylesheets", ->
    run "requirejs/build/build.sh #{type}.js", "Making #{type} RequireJS build", ->
      run "rm algo/css -rf", "Removing leftover files", cont

# Watch coffeescript files in dir and it's subdirectories
# Compile them into the appropriate folder on change, and prepare them for code coverage analysis
# Return the number of files and directories we watch, don't count directories without .coffee files
# Do NOT watch for files or directories created after startup
watch = (buildtype, dir=APPNAME) ->
    counts =
        files: 0
        dirs: 0

    for file in fs.readdirSync dir then do (file) ->
        fullfile = "#{dir}/#{file}"

        if (fs.statSync fullfile).isDirectory()
#           util.log "Recursing into #{fullfile}"
            ret = watch buildtype, fullfile
            counts.files += ret.files
            counts.dirs += ret.dirs

        else if file.match /[^.\#]+\.coffee$/ or file.match /[^.\#]+\.stylus$/
            counts.dirs = 1
            counts.files += 1

            fs.watchFile "#{fullfile}", (curr, prev) ->
                if +curr.mtime isnt +prev.mtime
                    output = dir.replace /coffee/g, 'js'
                    util.log "#{fullfile} changed"
                    invoke "build:#{buildtype}"

    return counts
# eof watch


#########
# Tasks #
#########

task_clean = (cont) ->
  run "rm development -rf && rm production -rf", null, cont

task_build = (type, cont) ->
  task_clean ->
    build type, cont

task_watch = (type) ->
  task_build type, ->
    SILENT = true
    counts = watch type
    util.log "Watching #{counts.files} files in #{counts.dirs} directories"

task 'clean', 'Remove build directories', -> task_clean()

task 'build:dev', 'Build development version', -> task_build 'dev'
task 'build:test', 'Build development version and tests', -> task_build 'test'
task 'build:prod', 'Build production version', -> task_build 'prod'

task 'watch:dev', '', -> task_watch 'dev'
task 'watch:test', '', -> task_watch 'test'
