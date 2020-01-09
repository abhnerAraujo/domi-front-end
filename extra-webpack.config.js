const webpack = require('webpack');
const keyPrefix = 'DOMI_';
const keys = Object.keys(process.env).filter((key) => key.startsWith(keyPrefix));
let env = {};
keys.forEach(key => env[key] = JSON.stringify(process.env[key]));
console.log('env=', env);

module.exports = {
  plugins: [new webpack.DefinePlugin({
    'process.env': {
      DOMI_API: JSON.stringify(process.env.DOMI_API),
    }
  })]
}