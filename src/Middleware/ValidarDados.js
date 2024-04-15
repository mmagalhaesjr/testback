//a função valida os dados antes de passar pelo controller.
// a função é acessada do arquivo de rotas.
export function validarDados(schema) {  //schema é literalmente o esquema de regras q vou seguir q esta no arquivo AutenticarSchema


    return (req, res, next) => {
        const usuario = req.body
        //oque recebo do cliente


        //então vou receber os daodo do body e comparar com o schema q recebo como parametro. 
        //nas rotas vou indentificar qual schema vou usar.

        const { error } = schema.validate(usuario, { abortEarly: false }); // (abortEarly: flase) = para não parar no primeiro erro encontado 
        if (error) {
            const erros = error.details.map((obj) => {
                return obj.message
            })
            return res.status(422).send(erros)
        }
        // A cima verifica se a algum erro ao comparado oq recebo do body com as minhas regras do cadastroSchema.
        // quando ha erros receberei um array.
        // os erros ficam em erro.datails, que é um array de objeto que são os erros em si.

        // aq dou continuação ao codigo, fazendo minhas verificaçoes com as informaçõs que já tenho

        next()
        //caso chegue até aq, o codigo correu todo ok
        //o next() faz prosseguir o codigo q está no arquivo de rotas
    }

}