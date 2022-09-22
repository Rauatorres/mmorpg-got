module.exports = (app) => {
  app.get('/', (req, res)=>{
    app.src.controller.index.index(app, req, res)
  })
  
  app.get('/cadastro', (req, res)=>{
    app.src.controller.index.cadastro(app, req, res)
  })
  
  app.post('/cadastrar', (req, res)=>{
    app.src.controller.index.cadastrar(app, req, res)
  })
  
  app.get('/jogo', (req, res)=>{
    app.src.controller.jogo.jogo(app, req, res)
  })
  
}