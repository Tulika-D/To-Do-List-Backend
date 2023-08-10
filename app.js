const express = require('express')
const app = express()
app.use(express.json())
var toDo = [{id:1, name:'read', desc:'read about rest api', status:'doing'},
{id:2, name:'write', desc:'write about rest api', status:'to-do'},
{id:3, name:'draw', desc:'draw a fruit', status:'done'},
{id:4, name:'eat', desc:'have lunch', status:'to-do'}]
app.get('/hello',(req,res)=>{
    res.send('to-do list')
})
app.get('/getFullList', (req,res)=>{
    res.json(toDo)
})
app.post("/createNewTask", (req,res)=>{
    console.log(req.body)
    toDo.push(req.body)
    res.json({msg:'success'})
})
app.post('/filter', (req,res)=>{
    console.log(req.body.type)
    const statusType = req.body.type
    const filteredArray = toDo.filter(toDoItem=>{
        return toDoItem.status===statusType
    })
    res.json(filteredArray)
})
app.post('/deleteTask', (req,res)=>{
    console.log(req.body)
    const uniqueid = req.body.uniqueID
    for(let i=0; i<toDo.length;i++){
        if(toDo[i].id===uniqueid){
            toDo.splice(i,1)
        }
    }
    res.json(toDo)
})
app.post('/updateStatus', (req,res)=>{
    const uniqueid =req.body.uniqueID
    const statusType = req.body.type
    for(let i=0; i<toDo.length;i++){
        if(toDo[i].id===uniqueid){
            toDo[i].status = statusType
        }
    }   
    console.log(toDo)
    res.json({msg:'updated successfully'})
}
)
app.listen(5001, ()=>{
    console.log('Server started')
})