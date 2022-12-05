module.exports = (app)=>{
    const DAO = class{
        constructor(collection){
            this.dbConnection = app.src.model.DBconnect
            this.usuarios = this.dbConnection.db.collection(collection)
        }
        
        async executeMethod(method){
            await this.dbConnection.client.connect()
            await method()
            await this.dbConnection.client.close()
        }
        
        async queryAll(){
            let res
            await this.executeMethod(async ()=>{
              res = await this.usuarios.find().toArray()
            })
            return res
          }
          
          async queryOne(dados){
            let res
            await this.executeMethod(async ()=>{
              res = await this.usuarios.findOne(dados)
            })
            return res
          }
          
          async insert(user){
            await this.executeMethod(async ()=>{
              await this.usuarios.insertOne(user)
            })
          }
    }

    return DAO
}