export async function validarToken(req, res, next) {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).send('Token de autorização não fornecido');
    }


    
    next()
}