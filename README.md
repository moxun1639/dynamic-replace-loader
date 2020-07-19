# dynamic-replace-loader
webpack dynamic-replace-loader

## Note
Only replace within a single file, Please make sure that the content to be replaced is not accessed by other files

## Getting Started
install
```console
npm install --save-dev dynamic-replace-loader
```

## webpack.config.js
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'dynamic-replace-loader',
      },
    ],
  },
};
```

# Example
```js
/* DYNAMIC-REPLACE _propA */
class User {
  constructor() {
    this._propA = 'private context'
  }

  printPropA() {
    console.log(this._propA)
  }
}
```
The code output by load: ('_propA' was replaced by random characters 'MX')
```js
/* DYNAMIC-REPLACE _propA */
class User {
  constructor() {
    this.MX = 'private context'
  }

  printPropA() {
    console.log(this.MX)
  }
}
```