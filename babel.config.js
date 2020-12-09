const dev = process.env.NODE_ENV === "development";

module.exports = {
  plugins: [
    [
      "babel-plugin-import",
      {
        libraryDirectory: "es",
        libraryName: "antd",
        style: true,
      },
      "antd",
    ],
  ],
  presets: [
    [
      "@babel/preset-env",
      // {
      //   corejs: 3,
      //   loose: true,
      //   modules: test ? 'auto' : false,
      //   useBuiltIns: 'usage',
      // },
    ],
    [
      "@babel/preset-react",
      {
        development: dev,
        runtime: "automatic",
        //   useBuiltIns: true,
      },
    ],
    ["@babel/preset-typescript"],
  ],
};
