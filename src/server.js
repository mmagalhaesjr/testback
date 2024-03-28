import express from "express";
import cors from "cors";

const carros = [
    {marca:'volkswagen',modelo:'rete', carro:'gol'},
    {marca:'volkswagen',modelo:'sedã', carro:'jetta'},
    {marca:'chevrolet',modelo:'sedã', carro:'camaro'},
    {marca:'chevrolet',modelo:'rete', carro:'onix'},
    {marca:'chevrolet',modelo:'sedã', carro:'prisma'},
    {marca:'fiat',modelo:'sedã', carro:'siena'},
    {marca:'fiat',modelo:'rete', carro:'palio'},
  ]


const server = express().use(cors());
server.use(express.json())
const PORTA = 4001;


//========================================================================
server.get("/carros",(req,res)=>{
    res.send(carros); 
})
//----------------------------------------------------------------------
server.post("/carros", (req,res)=>{
    const body = req.body
    carros.push(body)

    res.status(201).send('carro cadastrado com susseço')
})
//----------------------------------------------------------------------
server.put("/carros", (req, res) => {
    const { marca } = req.body;

    const carrosFiltrados = carros.filter(objeto =>
        objeto.marca.toLowerCase() === marca.toLowerCase()
    );

    res.send(carrosFiltrados);
});
//========================================================================




server.listen(PORTA, () => { 
    console.log(`*** Servidor rodando na porta ${PORTA} ***`);
});
