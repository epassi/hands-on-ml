module.exports = {
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        args[0].title = 'Housing Value Calculator';
        return args;
      });
  },
  publicPath: "."
};