const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src")
    },
    configure: (webpackConfig) => {
      // webpackConfig.resolve.fallback = {
      //   "assert": false,
      //   "url": false,
      //   "querystring": false,
      //   "crypto": false,
      //   "stream": false,
      //   "util": false,
      //   "http": false,
      //   "os": false,
      //   "https": false,
      //   "path": false,
      //   "fs": false,
      //   "net": false,
      //   "tls": false,
      //   "shallowequal": false
      // };
      webpackConfig.module.rules.push({
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false
        }
      });
      return webpackConfig;
    }
    // configure: {
    //   module: {
    //     rules: [
    //       {
    //         test: /\.m?js$/,
    //         resolve: {
    //           fullySpecified: false
    //         }
    //       }
    //     ]
    //   }
    // }
  }
};
