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

module.exports.jogo = (app, req, res)=>{
  if(req.session.authorized){
    res.render('jogo')  
  }else{
    res.redirect('/')
  }
}

module.exports.sair = (app, req, res)=>{
  req.session.destroy((err)=>{
    res.redirect('/')
  })
}
