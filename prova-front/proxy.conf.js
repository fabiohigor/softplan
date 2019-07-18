const proxy = [
  {
    context: ['/'],
    target: 'http://localhost:8080',
    secure: false,
    logLevel: 'debug',
    pathRewrite: {'^/' : ''}
  }
];
module.exports = proxy;
