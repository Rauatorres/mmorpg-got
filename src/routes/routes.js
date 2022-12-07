module.exports = (app) => {
  app.get('/', (req, res)=>{
    app.src.controller.index.index(app, req, res)
  })
  app.get('/index', (req, res)=>{
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
  
  app.post('/autenticar', (req, res)=>{
    app.src.controller.jogo.autenticar(app, req, res)
  })
  
  app.get('/sair', (req, res)=>{
    app.src.controller.jogo.sair(app, req, res)
  })

  app.get('/suditos', (req, res)=>{
    app.src.controller.jogo.suditos(app, req, res)
  })

  app.get('/pergaminhos', (req, res)=>{
    app.src.controller.jogo.pergaminhos(app, req, res)
  })

  app.post('/acao_suditos', (req, res)=>{
    app.src.controller.jogo.acaoSuditos(app, req, res)
  })

  app.get('/revogar_acao', (req, res)=>{
    app.src.controller.jogo.revogar(app, req, res)
  })
  
}