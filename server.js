const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;
const pasta = 'C:/Users/USER/Desktop/Modelos de IA/SimuladorDeCorrida/public/Desenv/data'; // Pasta onde estão os arquivos JSON
const pastaPublica = 'C:/Users/USER/Desktop/Modelos de IA/SimuladorDeCorrida/public/Desenv/public'; // Pasta onde está o index.html
const pastaData = 'C:/Users/USER/Desktop/Modelos de IA/SimuladorDeCorrida/public/Desenv/tarefasAI/data'; // Pasta onde está o narracao.json

// Novo endpoint para narracao.json
app.get('/narracao', (req, res) => {
    const arquivo = path.join(pastaData, 'narracao.json'); // Caminho direto para narracao.json
    if (fs.existsSync(arquivo)) {
        const dados = JSON.parse(fs.readFileSync(arquivo, 'utf-8'));
        res.json(dados);
    } else {
        res.status(404).send('Arquivo narracao.json não encontrado.');
    }
});

app.get('/pitin', (req, res) => {
    const arquivo = path.join(pastaData, 'pitin.json'); // Caminho direto para narracao.json
    if (fs.existsSync(arquivo)) {
        const dados = JSON.parse(fs.readFileSync(arquivo, 'utf-8'));
        res.json(dados);
    } else {
        res.status(404).send('Arquivo narracao.json não encontrado.');
    }
});

app.get('/insights', (req, res) => {
    const arquivo = path.join(pastaData, 'insights.json'); // Caminho direto para narracao.json
    if (fs.existsSync(arquivo)) {
        const dados = JSON.parse(fs.readFileSync(arquivo, 'utf-8'));
        res.json(dados);
    } else {
        res.status(404).send('Arquivo narracao.json não encontrado.');
    }
});

app.get('/melhoressetores', (req, res) => {
    const arquivo = path.join(pastaData, 'melhoressetores.json'); // Caminho direto para narracao.json
    if (fs.existsSync(arquivo)) {
        const dados = JSON.parse(fs.readFileSync(arquivo, 'utf-8'));
        res.json(dados);
    } else {
        res.status(404).send('Arquivo narracao.json não encontrado.');
    }
});

app.get('/melhorestp', (req, res) => {
    const arquivo = path.join(pastaData, 'melhores_tempos_previstos.json'); // Caminho direto para narracao.json
    if (fs.existsSync(arquivo)) {
        const dados = JSON.parse(fs.readFileSync(arquivo, 'utf-8'));
        res.json(dados);
    } else {
        res.status(404).send('Arquivo narracao.json não encontrado.');
    }
});

app.get('/melhoresvoltas', (req, res) => {
    const arquivo = path.join(pastaData, 'melhoresvoltas.json'); // Caminho direto para narracao.json
    if (fs.existsSync(arquivo)) {
        const dados = JSON.parse(fs.readFileSync(arquivo, 'utf-8'));
        res.json(dados);
    } else {
        res.status(404).send('Arquivo narracao.json não encontrado.');
    }
});

app.get('/statuscorrida', (req, res) => {
    const arquivo = path.join(pastaData, 'modelo_modificado.json');

    if (fs.existsSync(arquivo)) {
        const dados = JSON.parse(fs.readFileSync(arquivo, 'utf-8'));

        // Captura os parâmetros de filtro da query string
        const lapFilter = req.query.lap;
        const driverFilter = req.query.driver; // Adiciona o filtro de driver

        // Filtra os dados com base em LAP e Driver
        const dadosFiltrados = dados.filter(item => {
            const lapMatches = (lapFilter === 'Todas' || lapFilter === 'all') || item['Laps'] === Number(lapFilter); // Verifica se a LAP corresponde ou se 'Todas' foi selecionada
            const driverMatches = (driverFilter === 'Todas' || driverFilter === 'all') || item['Driver'] === driverFilter; // Verifica se o Driver corresponde ou se 'Todas' foi selecionada

            return lapMatches && driverMatches; // Retorna apenas os itens que atendem a ambas as condições
        });

        res.json(dadosFiltrados); // Retorna os dados filtrados
    } else {
        res.status(404).send('Arquivo modelo_modificado.json não encontrado.');
    }
});


// Rota para a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(pastaPublica, 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
