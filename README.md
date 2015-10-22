<a href="http://unicms.io"><img src="http://unicms.io/banners/standalone.png" /></a>

# Universe Modules - entrypoint edition

### This package is a work in progress!

There are some known issues, right now you should use it only if you're ready to work out with some bugs and maybe help with futher development.

## About

This package is essentially the same as `universe:modules` with one big difference:
You can use modules in plain `*.js` ans `*.jsx` files, there is no need for `*.import.js(x)` extension anymore.

For more info see [original universe:modules docs](https://github.com/vazco/universe-modules/)

## Installation

To use modules in your Meteor app you need to

    meteor add universe:modules-entrypoint

This package register compilers on `js` and `jsx` extension and because of that it will not work with `ecmascript` and `jsx` core packages installed at the same time.

You may need to remove them from you app.

`ecmascript` is installed in all newly created apps by default and you can remove it with

    meteor remove ecmascript

Our package give the same set of functionalities + modules support so it is completely safe to remove it.

Removing `jsx` can be more tricky as it could be implied by `react` "umbrella" package.

If your using `react` package then you need to remove it and add other dependencies back:

    meteor remove react jsx
    meteor add react-runtime react-meteor-data


### TL;DR

Full install script for react apps:

    meteor remove ecmascript react
    meteor add react-runtime react-meteor-data universe:modules-entrypoint


## Usage

You may notice that your app won't do anything right after install.

This is because files in your app won't get executed automatically anymore.

There is only one file (a.k.a. entry point) that will be executed when app starts, and you have to import all other files from it and start the app flow, similar to most node apps.

This file is `main.js` in app root directory (the same where `.meteor` directory is).

Inside this file you can import whatever other files you like.
Check [universe:modules docs](https://github.com/vazco/universe-modules/) on more info how to do this.
 
Keep in mind that there are two ways to import modules, normal and dynamic.

Normal is something like:

    import myModule from '/my/module/path'
    
This will execute file when all dependencies are ready, e.g. myModule will be executed first.

If this is not your intended behavior, e.g. you want to execute some code before loading all modules you can use dynamic syntax:

    console.log('this will execute right away');
    System.import('/my/module/path').then(myModule => {
        console.log('this will execute when myModule is ready:', myModule.default);
    })

Note: You cannot use relative paths when using dynamic syntax.


#### Safari and FlowRouter issue

There is one common issue with FlowRouter and Safari.
You need to tell FlowRouter to wait for routes to load, otherwise it may not load correctly.

You can do it like this:

    if (Meteor.isClient) {
        FlowRouter.wait();
    }
    System.import('/routesOrSomethingElse').then(() => {
        if (Meteor.isClient) {
            FlowRouter.initialize();
        }
    });
