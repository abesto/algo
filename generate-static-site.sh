#!/bin/bash

set -euo pipefail

./node_modules/coffee-script/bin/coffee app.coffee &
server=$!
trap "kill $server" EXIT
sleep 2  # Robust script waits for the server to come up in a robust way

builddir=${1:-generated-static}
rm -rf $builddir

get() {
    app_path="$1"
    if [ $# -eq 2 ]; then
        static_path=$builddir/$2
    else
        static_path=$builddir/$app_path
    fi
    mkdir -p $(dirname $static_path)
    echo "$app_path -> $static_path"
    curl -s localhost:8080/$app_path -o $static_path
}

# The HTML and CSS files we'll need
get / index.html
get css/main.css

# HTML snippets
for widget_file in $(ls views/controls); do
    get controls/$(basename -s .jade $widget_file)
done

# JS files generated from CoffeeScript
for module_name in $(cat $builddir/index.html | grep 'var jsPaths' | cut -f 6 -d' ' | tr -d ';' | jq 'to_entries|map(.value)|join("\n")' -r | sed 's~^/*~~'); do
    get $module_name.js
done

# Very static resources
for item in $(cd public; find . -type f | sed 's~^\./~~'); do
    get $item
done
