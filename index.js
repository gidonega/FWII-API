const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const app = express();
const PORT = 3000;

app.use(express.json());
let alunos = [
    {id:1, nome:'Geovana', idade: 20},
    {id:2, nome:'Ana', idade: 34}

]

app.get('/api/alunos', (req, res) => {
    res.json(alunos);
});

app.get('/api/alunos/getByName/:nome', (req, res) => {
    const { nome} = req.params;
    const index = alunos.findIndex(a => a.nome === nome);

    if(index > -1) {
        res.json(alunos[index]);
    } else{
        res.status(404).json({message:'aluno não encontrado'});
    }
});

app.post('/api/alunos', (req, res) => {
    const novoAluno = { id: alunos.length + 1, ...req.body};
    alunos.push(novoAluno);
    res.status(201).json(novoAluno);
});

app.put('/api/alunos/:id', (req, res) => {
    const { id } = req.params;
    const alunosIndex = alunos.findIndex(a => a.id === Number(id));
    

    if(alunosIndex > -1){
        alunos[alunosIndex] = {id: id, ...req.body};
        res.json(alunos[alunosIndex]);
    } else{
        res.status(404).json({message:'aluno não encontrado'});
    }
});


app.listen(PORT, () => {
    console.log(`servidor rodando na porta ${PORT}`)
});

