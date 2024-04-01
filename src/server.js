import express from "express";
import cors from "cors";

const server = express().use(cors());
server.use(express.json())
const PORTA = 4001;

const carros = [
    { marca: 'volkswagen', modelo: 'rete', carro: 'gol' },
    { marca: 'volkswagen', modelo: 'sedã', carro: 'jetta' },
    { marca: 'chevrolet', modelo: 'sedã', carro: 'camaro' },
    { marca: 'chevrolet', modelo: 'rete', carro: 'onix' },
    { marca: 'chevrolet', modelo: 'sedã', carro: 'prisma' },
    { marca: 'fiat', modelo: 'sedã', carro: 'siena' },
    { marca: 'fiat', modelo: 'rete', carro: 'palio' },
]


//========================================================================
server.get("/carros", (req, res) => {


    try {
        res.send(carros);
    } catch (error) {
        res.status(500).send('Erro ao encontrar o carro: ' + error.message);
    }
})
//----------------------------------------------------------------------
server.post("/carros", (req, res) => {
    const body = req.body
    
    try {
        carros.push(body);
        res.status(201).send('carro cadastrado com sucesso');

    } catch (error) {
        res.status(500).send('Erro ao cadastrar o carro: ' + error.message);
    }
})
//----------------------------------------------------------------------
server.put("/carros", (req, res) => {
    const { marca } = req.body;

    const carrosFiltrados = carros.filter(objeto =>
        objeto.marca.toLowerCase() === marca.toLowerCase()
    );

    try {
        res.send(carrosFiltrados);
    } catch (error) {
        res.status(500).send('Erro: ' + error.message);
    }

});
//========================================================================




server.listen(PORTA, () => {
    console.log(`*** Servidor rodando na porta ${PORTA} ***`);
});
