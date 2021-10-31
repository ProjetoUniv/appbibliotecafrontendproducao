
const proxy = [
  {
    context: '/bibliotecainfantil',
    target: 'http://localhost:8081',
    pathRewrite: {'^/bibliotecainfantil' : ''}
  }
];
module.exports = proxy;
