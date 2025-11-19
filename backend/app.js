
const express=require('express')
const app=express()
const todos=require('./routes/todos')
require('dotenv').config()
const notFound=require('./middleware/notfound')
const errorhandler=require('./middleware/errorhandler')

app.use(express.static('./public'))
app.use(express.json())

app.use('/todos',todos)

app.use(notFound)
app.use(errorhandler)

const port = process.env.PORT || 3000
const host = process.env.HOST || '0.0.0.0'

app.listen(port, host, () => {
    console.log(`server running on ${host}:${port}`)
})



