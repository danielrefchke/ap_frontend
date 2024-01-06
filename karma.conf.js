// Karma configuration
// Generated on Fri Dec 08 2023 17:13:32 GMT-0300 (hora estándar de Argentina)

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://www.npmjs.com/search?q=keywords:karma-adapter
    frameworks: ['jasmine', 'karma-typescript'],

    mime: {
      'text/x-typescript': ['ts']
    },



    // list of files / patterns to load in the browser
    files: [
      'src/**/*.spec.ts'
    ],


    // list of files / patterns to exclude
    exclude: [
      'node_modules/**',
      '.git/**',
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://www.npmjs.com/search?q=keywords:karma-preprocessor
    preprocessors: {
      'src/**/*.spec.ts': ['karma-typescript'],
    },

    karmaTypescriptConfig: {
      compilerOptions: {
        module: 'commonjs',
        target: 'es5',
      },
      include: [
        'src/**/*.ts',
        'src/**/*.spec.ts'
      ],
      exclude: [
        'node_modules/**',
        '.git/**',
      ],
    },

    typescriptPreprocessor: {
      // options passed to the typescript compiler
      options: {
        sourceMap: true, // generate source maps
        noResolve: false, // enforce type resolution
      },
      transformPath: function (path) {
        return path.replace(/\.ts$/, '.js');
      },
    },



    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://www.npmjs.com/search?q=keywords:karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://www.npmjs.com/search?q=keywords:karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser instances should be started simultaneously
    concurrency: Infinity,

    plugins: [
      'karma-typescript',
      'karma-jasmine',
      'karma-chrome-launcher',// Agrega el plugin de typescript aquí
    ],
  })
}
