module.exports = (app)=>{
  const UsuariosDAO = class{
    constructor(){
      this.dbConnection = app.src.model.DBconnect
      this.usuarios = this.dbConnection.db.collection('usuarios')
    }
    
    async executeMethod(method){
      await this.dbConnection.client.connect()
      await method()
      await this.dbConnection.client.close()
    }
  }
  
  return UsuariosDAO
}