module.exports = (app)=>{
    const DAO = app.src.model.DAO
    
    const DAOacao = class DAOacao extends DAO{
        constructor(){
            super('acao')
        }
    }

    return DAOacao
}