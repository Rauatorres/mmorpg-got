const { ObjectId } = require("mongodb")

module.exports = (app)=>{
    const DAO = class{
        constructor(collection){
            this.dbConnection = app.src.model.DBconnect
            this.collection = this.dbConnection.db.collection(collection)
            this.ObjectID = this.dbConnection.ObjectId
        }
        
        async executeMethod(method){
            await this.dbConnection.client.connect()
            await method()
            await this.dbConnection.client.close()
        }
        
        async queryAll(){
          let res
          await this.executeMethod(async ()=>{
            res = await this.collection.find().toArray()
          })
          return res
        }

        async queryMany(dados){
          if (dados.hasOwnProperty('_id')){
            dados._id = new this.ObjectID(dados._id)
          }
          let res
          await this.executeMethod(async ()=>{
            res = await this.collection.find(dados).toArray()
          })
          return res
        }
          
        async queryOne(dados){
          if (dados.hasOwnProperty('_id')){
            dados._id = new this.ObjectID(dados._id)
          }
          let res
          await this.executeMethod(async ()=>{
            res = await this.collection.findOne(dados)
          })
          return res
        }
        
        async insert(dados){
          await this.executeMethod(async ()=>{
            await this.collection.insertOne(dados)
          })
        }

        async updateOne(documento, dados){
          await this.executeMethod(async ()=>{
            await this.collection.updateOne(documento, {$set: dados})
          })
        }

        async deleteMany(requisitos){
          if(requisitos.hasOwnProperty("_id")){
            requisitos._id = new this.ObjectID(requisitos._id)
          }
          await this.executeMethod(async ()=>{
            await this.collection.deleteMany(requisitos)
          })
        }
    }

    return DAO
}