import express from "express";
import cors from "cors";
import 'dotenv/config';
import taskRoutes from "./router/taskRoutes.js"


// App Config
const app = express();
const port = process.env.PORT || 3000;


// Middleware
app.use(express.json());
app.use(cors());

// API endpoints
app.use('/tasks', taskRoutes);


app.get('/', (req, res) => {
    res.send("Server Working");
})


app.listen(port, () => {
    console.log(`server starting on http://localhost:${port}`);
})