# TODO: don't copy coffee and less files into builds

{exec} = require 'child_process'
util = require 'util'
fs = require 'fs'
less = require 'less'

APPNAME = 'algo'

run = (description, cmd, callback) ->
    util.log description
    exec cmd, (err, stdout, stderr) ->
        if err
            throw err
        else
            callback?(stdout)

build = (buildtype, callback) ->
    run "Copying jslibs/#{buildtype}/* to algo/js/lib", "mkdir algo/js/lib -p && cp jslibs/#{buildtype}/* algo/js/lib/", ->
        run "Copying csslibs/#{buildtype}/* to algo/css", "mkdir algo/css -p && cp csslibs/#{buildtype}/* algo/css/", ->
            run "Making #{buildtype} build", "requirejs/build/build.sh #{buildtype}.build.json", callback

compileLess = (filename, callback) ->
    out_filename = filename.replace(/\/less\//, '/css/').replace('.less', '.css')
    fs.readFile filename, 'utf8', (e, lesstext) ->
        less.render lesstext, (e, css) ->
            if e
                throw e

            if lesstext != '' and css == ''
                compileLess filename, callback
            else
                fs.writeFile out_filename, css, callback

compileDir = (dir, callback) ->
    run "Building #{dir}/coffee/*.coffee into #{dir}/js/", "coffee --compile --bare --output #{dir}/js #{dir}/coffee", ->
        run "Giving read rights to everyone on #{dir}/js", "chmod o+r #{dir}/js -R", ->
            util.log "Compiling #{dir}/less/*.less into #{dir}/css"
            run "Creating #{dir}/css directory", "mkdir #{dir}/css -p", ->
                files = fs.readdirSync "#{dir}/less"
                count = files.length
                for file in files then do (file) ->
                    compileLess "#{dir}/less/#{file}", ->
                        count--
                        if count == 0
                            callback?()

compileProject = (buildtype, callback) ->
    compileDir APPNAME, ->
        build buildtype, callback


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

        else if file.match /[^.\#]+\.less$/
            counts.dirs = 1
            counts.files += 1

            fs.watchFile "#{fullfile}", (curr, prev) ->
                if +curr.mtime isnt +prev.mtime
                    # Delay because sometimes the editor won't have finished writing the file to disk when we are here
                    # coffee seems to handle this, but less just gives an empty file. Should file upstream as bug (not checked in HEAD)
                    setTimeout ->
                        output = dir.replace /less/g, 'css'
                        util.log "Saw change in #{fullfile}, compiling to #{output}"
                        compileLess fullfile, ->
                            build buildtype
                    , 100

    return counts
# eof watch


#########
# Tasks #
#########

task 'clean', '', ->
    run 'Cleaning project', "rm #{APPNAME}/js -rf && rm #{APPNAME}/css -rf && rm development -rf && rm production -rf"

task 'build', 'Build development version', ->
    invoke 'clean'
    compileProject 'development'

task 'build:prod', 'Build production version', ->
    compileProject 'production'

task 'watch', 'Watch CoffeeScript files, compile and instrument for testing as needed', ->
    invoke 'build'
    counts = watch APPNAME, 'development'
    util.log 'Watching ' + counts.files + ' files in ' + counts.dirs + ' directories'
