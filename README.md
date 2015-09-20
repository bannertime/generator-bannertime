# ![Logo](generators/app/templates/src/images/logo.png)

[![Build Status](https://img.shields.io/travis/pyramidium/generator-bannertime/master.svg?style=flat-square)](http://travis-ci.org/pyramidium/generator-bannertime)

> Yeoman generator for HTML5 banners.

> * Designed to streamline new banner builds
> * Standardised workflow
> * Gulp best practices


## Usage

More information, options and parameters in the [usage documentation page](docs/usage.md).


## Install

##### Make sure `node` is installed:
```
node -v
```

> If node is not installed, install it [here](https://nodejs.org)

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


## Documentation

* [Docs](docs/README.md)
* [User guide](docs/user-guide.md)
* [How it works](docs/how-it-works.md)


## Features

![Logo](docs/assets/gulp.png)
![Logo](docs/assets/browsersync.png)
![Logo](docs/assets/sass.png)
![Logo](docs/assets/doubleclick.png)
![Logo](docs/assets/adform.png)
![Logo](docs/assets/sizmek.png)


## Contributing

[Guidelines](CONTRIBUTING.md)


## Changelog

[Changelog](https://github.com/pyramidium/generator-bannertime/releases)


## License

MIT
