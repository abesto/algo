FROM node:0.10

# Most of this would be covered by node:0.10-onbuild, but that doesn't support npm shrinkwrap
# See https://github.com/docker-library/node/issues/30
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY npm-shrinkwrap.json package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app

EXPOSE 80
CMD ["./node_modules/coffee-script/bin/coffee", "app.coffee", "80", "0.0.0.0"]
