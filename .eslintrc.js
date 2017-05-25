module.exports = {
  env: {
    browser: true,
  },
  extends: "airbnb-base",
  plugins: [
    "import",
    "html",
  ],
  // add your custom rules here
  // 0 = off, 1 = warn, 2 = error
  rules: {
    "consistent-return": 0,
    "no-new": 0,
    "no-undef": 0,
    "no-param-reassign": 0,
    "dot-notation": 0,
    "linebreak-style": 0,
    // allow console during development
    "no-console": process.env.NODE_ENV === 'production' ? 2 : 0,
  },
};
