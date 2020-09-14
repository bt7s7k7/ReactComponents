const { alias } = require('react-app-rewire-alias')

module.exports = function override(config) {
    alias({
        'root': '.',
    })(config)

    return config
}