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

##### Install required tools `yo` and `gulp`:
```
npm install -g yo gulp
```

---

#### ~~When npm package is published just use one command~~

##### ~~Install the banner generator `generator-bannertime`:~~
~~npm install -g generator-bannertime~~
> ~~https://gist.github.com/coolaj86/1318304~~

---

#### For now we can install the generator manually

##### Clone the generator repo:
```
git clone https://github.com/pyramidium/generator-bannertime.git
```

##### Change directory into generator-bannertime:
```
cd generator-bannertime
```

##### Install node modules:
```
npm install
```

##### Symlink generator so that it can be run locally:
```
npm link
```

> Because generator-bannertime was specified as the package name in package.json the `npm link` will create a symbolic link in a more widely-accessible location (e.g., /usr/local/lib/node_modules/generator-blog). This enables you to access the local generator-banner generator globally using `yo bannertime`, making development, and life in general, much easier.


## Create a new banner with the generator

##### Create a new directory and change into that directory:
```
mkdir my-new-banner && cd $_
```

##### Run `yo bannertime`, and answer the questions:
```
yo bannertime
```

## Answer the questions

You will be prompted with the following questions when you run the generator.

* What is the name of the banner?
* Describe the banner
* What type of banner is it?
* Set the width of the banner
* Set the height of the banner
* What is the link to the repository?
* When the ad is zipped, what should it be called?
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
    - sass.js (Config file for sass task)
    - server.js (Config file for server task)
    - svg-sprite.js (Config file for svg-sprite task)
    - zip.js (Config file for zip task task)
  /lib
    - handleErrors.js (Stop gulp from exiting when there is a syntax error)
  /tasks
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
