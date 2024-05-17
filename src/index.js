import cors from "cors";
import express from "express";

import { routes } from "./router/index.js";
import { createTables } from "./utils/create-tables.js";

const app = express();

app.use(express.json());
app.use(cors())
app.use(...routes)

await createTables();

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send({ message: 'Erro interno do servidor' });
});


app.listen(process.env.PORT || 3000, console.log("server running... 🔥"));
