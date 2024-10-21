import express from 'express'
import cors from 'cors'

const app = express();
app.use(express.json());

const port: number = 3000;

app.get('/',async (req, res) => {
    res.send("Home Page")
})

app.listen(port, ()=> {
    console.log(`Server is listening on Port ${port}`);
})