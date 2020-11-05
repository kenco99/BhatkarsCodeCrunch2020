const express = require("express")
const cookieParser = require('cookie-parser')

const section1Router = require('./routers/section1-country')
const section2Router = require('./routers/section2-covid19')
const section3Router = require('./routers/section3-weather')
const section4Router = require('./routers/section4-twitter')


const app = express()
const port = process.env.PORT 

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(section1Router)
app.use(section2Router)
app.use(section3Router)
app.use(section4Router)

app.use(function(req, res, next){
  res.status(404);

  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

});

app.listen(port,()=>{
    console.log('Server running on port ' + port)
})


