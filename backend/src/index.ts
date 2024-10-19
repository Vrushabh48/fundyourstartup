import express from 'express'

const app = express();

const port: number = 3000;

app.get('/',async (req, res) => {
    res.send("Home Page")
})

app.listen(port, ()=> {
    console.log(`Server is listening on Port ${port}`);
})