const express = require('express');
const app = express();

// Serve pro servidor não ficar "cego" e conseguir ler o JSON (Aula 4)
app.use(express.json());

// Lista dos 10 filmes
let filmes = [
    { id: 1, titulo: "Homem aranha no aranha verso", diretor: "Bob Persichetti", nota: 10, genero: "Animacao" },
    { id: 2, titulo: "Amor com data marcada", diretor: "John Whitesell", nota: 7, genero: "Romance" },
    { id: 3, titulo: "Vingadores ultimato", diretor: "Joe Russo", nota: 10, genero: "Acao" },
    { id: 4, titulo: "Juntos e misturados", diretor: "Frank Coraci", nota: 8, genero: "Comedia" },
    { id: 5, titulo: "Arremessando Alto", diretor: "Jeremiah Zagar", nota: 9, genero: "Drama" },
    { id: 6, titulo: "Homem aranha sem volta pra casa", diretor: "Jon Watts", nota: 10, genero: "Acao" },
    { id: 7, titulo: "Operação big hero", diretor: "Don Hall", nota: 9, genero: "Animacao" },
    { id: 8, titulo: "Camp rock", diretor: "Matthew Diamond", nota: 7, genero: "Musical" },
    { id: 9, titulo: "Lemonade Mouth", diretor: "Patricia Riggen", nota: 8, genero: "Musical" },
    { id: 10, titulo: "A hora do rush", diretor: "Brett Ratner", nota: 9, genero: "Comedia" }
];

let proximoId = 11;

// Rota GET Listar tudo (Aula 3)
app.get('/api/filmes', (req, res) => {
    res.json(filmes);
});

// Rota POST Criar novo filme com as travas da Aula 4
app.post('/api/filmes', (req, res) => {
    const { titulo, diretor, nota, genero } = req.body;

    // Se faltar campo, o servidor barra com 400 (Bad Request)
    if (!titulo || !diretor || !nota || !genero) {
        return res.status(400).json({ erro: "Faltam dados! Preenche tudo aí." });
    }

    // Regra da nota tem que ser de 0 a 10 (Erro 422 - Unprocessable Entity)
    if (nota < 0 || nota > 10) {
        return res.status(422).json({ erro: "Nota inválida! Tem que ser entre 0 e 10." });
    }

    // Gerando o objeto novo com ID automático
    const novoFilme = { id: proximoId++, titulo, diretor, nota, genero };
    filmes.push(novoFilme);
    
    // Sucesso: 201 Created
    res.status(201).json(novoFilme);
});

app.listen(3001, () => {
    console.log("🔥 Servidor rodando em: http://localhost:3001/api/filmes");
});