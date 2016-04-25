# <%= bannerName %>

<%= bannerDesc %>


## Usage


### Gulp Commands

```bash
gulp
```
The default task will compile the source files and launch the development server. The watch task will monitor changes made to the source files and Browser Sync will refresh the browser and your changes will be reflected in the browser.

```bash
gulp prod
```
The production task will generate the production ready files. This will minify the html, javascript and css files and create zip packages for each banner.

```bash
gulp backup-gen
```
The backup generator task will automatically generate backup images for each banner from the last frame of the banner's animation.


### Creating Elements

In the `createElements.js` file for each banner you can create DOM elements using the `SmartObject` class. Instantiating a new `SmartObject` will create a new element. By default, the `SmartObject` class will create a `<div>` tag with the default style of: `position: absolute; top: 0; left: 0;`. By setting a background image when instantiating a `SmartObject` the width and height dimensions will be fetched from the image and used to set the size of the element. You can manually set the elements's width and height properties like this:

```js
this.logo = new SmartObject({
  backgroundImage: 'images/logo.png',
  width: 200,
  height: 50,
  parent: this.banner
});
```

It is possible to create video elements using:

```js
this.video = new SmartObject({
  type: 'video',
  sources: [{
    'url': 'path/to/file.mp4',
    'type': 'video/mp4'
  }],
  height: 300,
  width: 250,
  parent: this.banner
});
```


### Setup

In the `setup.js` file for each banner you can set the initial state for each element using the below functions.

* set(properties)
* center()
* centerHorizontal()
* centerVertical()
* get(property)
* getOriginal(property)

This is how you would position an element 100px from the top that is centered horizontally.

```js
this.logo.centerHorizontal();
this.logo.set({ top: 100 });
```


### Animation

The `animate.js` file contains the main animation timeline.

For more information about animating using GSAP head to [www.greensock.com](http://www.greensock.com)
