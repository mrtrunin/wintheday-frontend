module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        // "react"
    ],
    "globals": {
        "M": true,
        "$": true
    },
    "plugins": ["react"],
    "parser": "babel-eslint",
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 6,
        "ecmaFeatures": {
            modules: true,
            jsx: true,
            arrowFunctions: true,
            blockBindings: true
        }
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": 0,
        "strict": 0,
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
    }
}