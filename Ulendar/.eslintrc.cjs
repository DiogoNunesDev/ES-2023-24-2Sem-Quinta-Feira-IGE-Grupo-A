module.exports = {
    "parser": "@babel/eslint-parser",
    "plugins": [
        "react"
    ],
    "rules": {
        "complexity": ["error", 4] // se houver mais de 10 ifs, else, else if, switch, case, for, while, do, for in, for of, o eslint vai acusar erro
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    }
}

//npx eslint 'src/**/*.jsx' --comanodo para chamar o eslint