# User guide

> Once you have installed the files using `yo bannertime`.


##### Start up the development server:
```
gulp
```

* Running `gulp` will build the files from the `src/` directory and compile them in the `public/` directory.

* A development server will be started on `http://localhost:3000/`.

* Browser Sync will watch the `src/` directory for changes and automagically update the browser on save.


## Preparing files for production

##### Minify and zip the files:
```
gulp prod
```

* Running `gulp prod` will build the files from the `src/` directory and minify them in the `public/` directory.

* A production server to preview the production files will open on `http://localhost:5000/`.

* A zip of the production files will be created in the `zip/` directory.

> Note: the production server will not watch files for changes.
