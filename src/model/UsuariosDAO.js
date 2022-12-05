
module.exports = (app)=>{
  const DAO = app.src.model.DAO
  const UsuariosDAO = class UsuariosDAO extends DAO{
    constructor(){
      super('usuarios')
    }
  }
  
  return UsuariosDAO
}