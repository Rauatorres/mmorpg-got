module.exports.autenticar = async (app, req, res)=>{
  req.assert('usuario', 'Campo usuario e obrigatorio!').notEmpty()
  req.assert('senha', 'Campo senha e obrigatorio!').notEmpty()
  
  var erros = req.validationErrors()
  
  if(erros){
    res.render('index', {validacao: erros})
    return
  }
  
  const UsuariosDAO = new app.src.model.UsuariosDAO()
  var login = await UsuariosDAO.queryOne(req.body)
  
  if(login != null){
    req.session.authorized = true
    req.session.usuario = login.usuario
    req.session.casa = login.casa
    res.redirect('/jogo')
  }else{
      res.render('index', {validacao: [{msg: "Usuario e/ou senha incorretos!"}]})
  }
}

module.exports.jogo = async (app, req, res)=>{

  if(!req.session.authorized){
    res.redirect('/')
    return
  }

  const UsuariosDAO = new app.src.model.UsuariosDAO()
  const JogoDAO = new app.src.model.JogoDAO()


  let usuario = await UsuariosDAO.queryOne({usuario: req.session.usuario})
  let usuarioReordenado = Object.assign({
    nome: null,
    usuario: null,
    senha: null,
    casa: null
  }, usuario)
  let usuarioInfo = await JogoDAO.queryOne({usuario: usuarioReordenado})

  res.render('jogo', {usuarioInfo: usuarioInfo})  
}

module.exports.sair = (app, req, res)=>{
  req.session.destroy((err)=>{
    res.redirect('/')
  })
}

module.exports.suditos = (app, req, res)=>{
  res.render('aldeoes')
}

module.exports.pergaminhos = (app, req, res)=>{
  res.render('pergaminhos')
}
