module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  rules: {
    semi: ['error', 'never'],
    'react/react-in-jsx-scope': 0,
    'no-plusplus': 0,
    'react/no-unknown-property': 0,
    'jsx-a11y/label-has-for': 0,
    'react/prop-types': 0,
    'react/no-string-refs': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/mouse-events-have-key-events': 0,
  },
  env: {
    browser: true,
  }
}