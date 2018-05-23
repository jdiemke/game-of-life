module.exports = (config) => {
    config.set({
        frameworks: ['jasmine'],
        files: [{
            pattern: 'src/**/*.spec.ts'
        }],
        mime: {
            'text/x-typescript': ['ts', 'tsx']
        },
        preprocessors: {
            'src/**/*.spec.ts': ['webpack']
        },
        webpack: require('./webpack.config'),
        reporters: ['kjhtml', 'progress'],
        browsers: ['Chrome'],
        logLevel: config.LOG_INFO,
        singleRun: false
    });
};
