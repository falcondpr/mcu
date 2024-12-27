import styleXPlugin from "@stylexjs/babel-plugin";

const config = {
  plugins: [
    [
      styleXPlugin,
      {
        dev: true,
        test: false,
        unstable_moduleResolution: {
          type: "commonJS",
          rootDir: __dirname,
        },
      },
    ],
  ],
};

export default config;
