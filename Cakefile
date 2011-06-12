{exec} = require 'child_process'
util = require 'util'
fs = require 'fs'

APPNAME = 'algo'


run = (cmd, desc, callback) ->
  title = desc ? cmd
  util.log title

  exec cmd, (error, stdout, stderr) ->
    if (stdout.split "\n").length > 1
      stdout = "\n" + stdout
    if error
      util.log "\"#{title}\" ended with error. STDOUT: \"#{stdout}\". Error object: \"#{error}\""
    else
      util.log "\"#{title}\" finished. Output: \"#{stdout}\""
      callback?()
# eof run

build = (type, callback) ->
  run "mkdir algo/css -p && stylus algo/stylus -o algo/css", "Compiling Stylus stylesheets", ->
    run "requirejs/build/build.sh #{type}.js", "Making #{type} RequireJS build", ->
      run "rm algo/css -rf", "Removing leftover files", callback


# Watch coffeescript files in dir and it's subdirectories
# Compile them into the appropriate folder on change, and prepare them for code coverage analysis
# Return the number of files and directories we watch, don't count directories without .coffee files
# Do NOT watch for files or directories created after startup
watch = (dir, buildtype) ->
    counts =
        files: 0
        dirs: 0

#   util.log "Watching for changes in #{dir}"
    for file in fs.readdirSync dir then do (file) ->
        fullfile = "#{dir}/#{file}"

        if (fs.statSync fullfile).isDirectory()
#           util.log "Recursing into #{fullfile}"
            ret = watch fullfile, buildtype
            counts.files += ret.files
            counts.dirs += ret.dirs

        # CoffeeScript
        else if file.match /[^.\#]+\.coffee$/
            counts.dirs = 1
            counts.files += 1

            fs.watchFile "#{fullfile}", (curr, prev) ->
                if +curr.mtime isnt +prev.mtime
                    output = dir.replace /coffee/g, 'js'
                    run "Saw change in #{fullfile}, compiling to #{output}", "coffee --compile --output #{output} #{fullfile}", ->
                        build buildtype

    return counts
# eof watch


#########
# Tasks #
#########

task 'clean', 'Remove build directories', ->
  run "rm development -rf && rm production -rf"

task 'build:dev', 'Build development version', ->
  invoke 'clean'
  build 'dev'

task 'build:test', 'Build development version and tests', ->
  invoke 'clean'
  build 'test'

task 'build:prod', 'Build production version', ->
  invoke 'clean'
  build 'prod'
