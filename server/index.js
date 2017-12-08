const Koa = require('koa');
const serve = require('koa-static');
const path = require('path');
const fs = require('fs');
const logger = require('koa-logger')
const app = new Koa();

const indexHtml = fs.readFileSync(path.resolve(__dirname, '../build/index.html'), { encoding: 'utf8' });
app.use(serve(path.resolve(__dirname, '../build/')));

app.use((ctx, next) => {
  if (ctx.path.indexOf('/static/') !== -1) return next();
  ctx.body = indexHtml;
  next();
});

app.use(logger());
app.listen(80, () => {
  console.log('raemian server is listening to port 80');
});
