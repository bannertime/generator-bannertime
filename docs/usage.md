# Usage

> This generator may require that you have admin privelages to install.

## Install the generator

##### Make sure `node` is installed:
```
node -v
```

> If node is not installed:
> * install [nvm](https://github.com/creationix/nvm) and follow the installation instructions
> * or install the [nodejs](https://nodejs.org) package

##### Install required tools `yo`, `gulp` and `generator-bannertime`:
```
npm install -g yo gulp generator-bannertime
```

> You may need to use `sudo npm install -g yo gulp generator-bannertime`


## Create a new banner with the generator

##### Create a new directory and change into that directory:
```
mkdir my-new-banner && cd $_
```

##### Run `yo bannertime`, and answer the questions:
```
yo bannertime
```

> If you have issues installing node modules when running the generator try using `sudo chown -R $USER /usr/local` to allow the current user to run npm install without sudo.

## Answer the questions

You will be prompted with the following questions when you run the generator.

* What is the name of the banner?
* Describe the banner
* What type of banner is it?
* What is the link to the repository?
* Include GSAP for offline use?
* Include DoubleClick Enabler for offline use?

## Generated file structure

The default file structure that is generated.

```
/gulpfile.js
  /config
    - browserSync.js (Config file for browser sync task)
    - fonts.js (Config file for fonts task)
    - html.js (Config file for html task)
    - images.js (Config file for images task)
    - index.js (Config file for base directories)
    - javascript.js (Config file for javascript task)
    - json.js (Config file for json task)
    - sass.js (Config file for sass task)
    - server.js (Config file for server task)
    - svg-sprite.js (Config file for svg-sprite task)
    - zip.js (Config file for zip task task)
  /lib
    - handleErrors.js (Stop gulp from exiting when there is a syntax error)
  /tasks
    - backupImage.js (Task for prompting the user if there is no backup image)
    - browserSync.js (Task for fast live reload injection)
    - build-development.js (Task that runs development tasks)
    - build-production.js (Task that runs production tasks)
    - clean.js (Task that deletes assets before build)
    - default.js (Task for enabling `gulp` shortcut instead of typing `gulp build:development`)
    - fonts.js (Task for copying font files to public directory)
    - help.js (Task for providing help with gulp commands)
    - html.js (Task for copying html files to public directory)
    - images.js (Task for copying and compressing image files to public directory)
    - javascript.js (Task for copying js files to public directory)
    - json.js (Task for copying json files to public directory)
    - prod.js (Task for enabling `gulp prod` shortcut instead of typing `gulp build:production`)
    - sass.js (Task for compiling sass files into css in the public directory)
    - server.js (Task for setting up a local production server)
    - svg-sprite.js (Task for converting svg files into an svg spritesheet, a png spritesheet and the sprite dimensions in a css file)
    - watch.js (Task for watching files for changes and triggering browser sync to reload the page on update)
    - zip.js (Task for compressing files for delivery)
/src
  /fonts
  /html
    - index.html (The index html file)
  /images
    - logo.png (Bannertime logo)
  /js
    - banner.js (Base banner functions)
    - banner.loader.js (Used to load files politely)
    - banner.animation.js (The main creative file)
  /styles
    /base
      - _banner.scss (Base banner styles)
      - _preloader.scss (Base preloader styles)
    - style.scss (Imports the base styles for the banner)
.editorconfig (Used to help developers define and maintain consistent coding styles between different editors and IDEs)
.gitignore (Used to ignore files when committing to a git repository)
.jshintrc (Helps to detect errors and potential problems in code)
package.json (Contains project node/npm package data)
README.md (Readme file for developers)
```

## Technologies

This project uses the latest versions of the following libraries:

- [Node](https://nodejs.org/)
- [Gulp](http://gulpjs.com/)
- [SASS](http://sass-lang.com/)
- [BrowserSync](http://www.browsersync.io/)
- [Express](http://expressjs.com/)

Along with many Gulp libraries (these can be seen in the generated `package.json` file).
