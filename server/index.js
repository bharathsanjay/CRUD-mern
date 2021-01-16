const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const Friend = require('./models/Friends');

app.use(cors());
app.use(express.json());

const dbPath = ""; // add mongodb URL
mongoose.connect(dbPath, {
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology : true

}).then(() => {
    console.log('connected to mongoDB');
}).catch((err) => console.log('error connecting to db'));

app.post("/addfriend", (req,res) => {
    const {name, age} = req.body;
    console.log(name);
    console.log(age);
    const friend = new Friend({
        name : name,
        age : age
    })
     friend.save()
     .then(() => {console.log('data posted')})
     .catch(() => {console.log('oops,error')})

})

app.get("/read", async (req,res) => {
    Friend.find({}, (err, result) => {
        if(err)
         { 
             res.send(err);
         }
         else{
             res.send(result);
         }
    });
});

app.put("/update", async(req,res) => {
    const {newAge, id} = req.body;
    await Friend.findById(id,(err, friendtoUpdate) => {
        friendtoUpdate.age = Number(newAge);
        friendtoUpdate.save(); 
    })
    res.send('updated');
})

app.delete("/delete/:id", async(req,res) => {
    const id = req.params.id;
    await Friend.findByIdAndRemove(id).exec();
    res.send("item deleted");
})

app.listen(8080, () => {
    console.log("server running on port 8080");
})