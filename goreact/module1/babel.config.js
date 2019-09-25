module.exports = {
  presets: [
    "@babel/preset-env", // adds support for ES6+ syntax and features
    "@babel/preset-react" // adds support for react-specific syntax/features
  ],
  plugins: [
    // enables using react's state within class scope without constructor
    "@babel/plugin-proposal-class-properties"
  ]
};
