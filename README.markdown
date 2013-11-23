flickr-viewer
=============

An example of building browser apps using [node](http://nodejs.org), [npm](http://npmjs.org) and [browserify](http://browserify.org/). Based on [look-ma-no-frameworks](https://github.com/robashton/look-ma-no-frameworks).

The app itself it pretty simple: search public flickr photos by tag, display clickable thumbnails that render a larger image.

basic goals
===========

This is mostly a learning experience for me so I'm keeping it simple. The idea was to keep the modules small, singular and isolated. For example, the searchbar has no idea there are any other parts to the app, but it exposes itself to anybody interested using events. In fact, events are how all of the communication is done (poorly at the moment). Some modules are composed of others, however. In those cases the parent has root has knowledge and access to it's children, but not the reverse. The same is true of the router; again, it does it's thing and emits events.

Another goal here was to avoid using anything other than what node and npm could provide me. To that end, all build steps are done using npm.

install
=======

Just clone the repo, and:

```
sudo npm install
```

build
=====

The bundled/minified of the JS and CSS is in the repo, but if you want to play around, just:

```
npm run watch
```

The above with run:

```
npm run watch-js && npm run watch-css
```

run it
======

Again, npm run:

```
npm run start
```

Then hit http://localhost:8080

license
=======
Doubt it matters, but it's MIT.