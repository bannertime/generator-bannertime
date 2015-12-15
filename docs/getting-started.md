# Getting Started

Follow these steps to scaffold out a HTML5 banner campaign.

#### 1. Install yeoman globally:

```sh
$ npm install --global yo
```

#### 2. Install gulp globally:

```sh
$ npm install --global gulp
```

#### 3. Install bannertime globally:

```sh
$ npm install --global generator-bannertime
```

#### 4. Install bannertime dependencies:

```sh
$ npm install
```

#### 5. Create a new directory:

```sh
$ mkdir my-new-banner && cd $_
```

#### 6. Run the generator:

```sh
$ yo bannertime
```

The generator will then prompt you with a few questions about which kind of project you'd like to generate.

> It may take a few minutes to install the dependencies. Please be patient.

## What do I do now?

Once the generator is complete and all of the dependencies have been installed, you will be able to start up the development server.

#### Run the development task:

```sh
$ gulp
```

This will build the source files from the `src/` directory and output them in the `public/` directory.

> Remember to only edit files in the `src/` directory as the files within the `public/` directory are "cleaned" every time gulp runs.

#### Create a new banner:

```sh
$ yo bannertime:new
```

The generator will then prompt you with a few questions about which kind of banner you'd like to generate. The format will then be generated and automatically added to the preview file.

#### Compile files for production

```sh
$ gulp prod
```

This task will minify all html, css and javascript files and compress images. It will also zip the production ready files from each directory in the `public/` directory.

## Not working?

If you are having trouble installing the generator please have a read through the [docs](docs/README.md) and if you still cannot get the project up and running create an issue [here](issues/new).
