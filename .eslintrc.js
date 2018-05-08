module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  rules: {
    semi: ['error', 'never'],
    'react/react-in-jsx-scope': 0,
  },
  env: {
    browser: true,
  }
}