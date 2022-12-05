module.exports = (app)=>{
    const DAO = app.src.model.DAO
    const JogoDAO = class JogoDAO extends DAO{
        constructor(){
            super('jogo')
        }
    }

    return JogoDAO
}