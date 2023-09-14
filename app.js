const express = require('express')
const categories = require('./Routes/categories')
const app = express()


app.use(express.json())

app.use(categories)


const port =  process.env.PORT || 3000;
app.listen(port, (err)=>{
    if(err) console.log('error error')
    console.log(`server is listening on ${port}`)
})