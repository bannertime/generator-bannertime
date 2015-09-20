# User guide

> To use this generator follow the steps below.

## Create a new banner with the generator

##### Create a new directory and change into that directory:
```
mkdir my-new-banner && cd $_
```

##### Run the generator:
```
yo bannertime
```

> Now all you have to do is answer the questions to build your new project.

##### Start up the development server:
```
gulp
```

* Running `gulp` will build the files from the `src/` directory and compile them in the `public/` directory.

* A development server will be started on `http://localhost:3000/`.

* Browser Sync will watch the `src/` directory for changes and automagically update the browser on save.

## Preparing files for production

##### Run `gulp prod`:
```
gulp prod
```

* Running `gulp prod` will build the files from the `src/` directory and minify them in the `public/` directory.

* A production server to preview the production files will open on `http://localhost:5000/`.

* A zip of the production files will be created in the `zip/` directory.

> Note: the production server will not watch files for changes.
