//congifuration to make next poll every 300ms so that it fixes the issue of reloading
module.exports = {
    webpackDevMiddleware: config => {
        config.watchOptions.poll = 300
        return config
    }
   
    
}