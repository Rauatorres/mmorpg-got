module.exports = (app)=>{
    const DAO = app.src.model.DAO
    
    const JogoDAO = class JogoDAO extends DAO{
        constructor(){
            super('jogo')
        }

        async pagar(documento, preco){
            await this.executeMethod(async ()=>{
                await this.collection.updateOne(documento, {$inc: {moeda: -preco}})
            })
        }

        async pesquisarPorUsuario(usuario){
            if(usuario.hasOwnProperty('_id')){
                usuario._id = new this.ObjectID(usuario._id)
            }
            let res 
            let usuarioReordenado = Object.assign({
                nome: null,
                usuario: null,
                senha: null,
                casa: null
            }, usuario)
            await this.executeMethod(async ()=>{
                res = await this.collection.findOne({usuario: usuarioReordenado})
            })
            return res
        }
    }


    return JogoDAO
}