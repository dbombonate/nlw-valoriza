import express from 'express';

const app = express();

/*
 * GET => Buscar informação
 * POST => Inserir (Criar) informação
 * PUT => Atualizar uma informação existente
 * DELETE => Remover um dado
 * PATCH => Alterer informação específica 
 */

app.get('/test', (req, res) => res.send("Rota de GET no recurso test"));

app.post('/test-post', (req, res) => res.send("Rota de POST no recurso test"))
app.listen(3000, () => console.log("Server is running on port 3000"));