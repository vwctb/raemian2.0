const Koa = require('koa');
const serve = require('koa-static');
const path = require('path');
const fs = require('fs');
const app = new Koa();

const indexHtml = fs.readFileSync(path.resolve(__dirname, '../build/index.html'), { encoding: 'utf8' });
const port = process.env.PORT || 4000;

app.use(serve(path.resolve(__dirname, '../build/')));
app.use(ctx => {
  ctx.body = indexHtml;
});

app.listen(port, () => {
  console.log('raemian server is listening to port ' + port);
});