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

  let msg = ''
  if(req.query.msg != ''){
    msg = req.query.msg 
  }

  const UsuariosDAO = new app.src.model.UsuariosDAO()
  const JogoDAO = new app.src.model.JogoDAO()


  let usuario = await UsuariosDAO.queryOne({usuario: req.session.usuario})
  let usuarioInfo = await JogoDAO.pesquisarPorUsuario(usuario)

  res.render('jogo', {usuarioInfo: usuarioInfo, msg: msg})  
}

module.exports.sair = (app, req, res)=>{
  req.session.destroy((err)=>{
    res.redirect('/')
  })
}

module.exports.suditos = (app, req, res)=>{
  res.render('aldeoes')
}

module.exports.pergaminhos = async (app, req, res)=>{
  const DAOacao = new app.src.model.DAOacao()
  const UsuariosDAO = new app.src.model.UsuariosDAO()
  const JogoDAO = new app.src.model.JogoDAO()

  let data = new Date()
  let momentoAtual = data.getTime()

  
  await DAOacao.deleteMany({usuario: req.session.usuario, termino: {$lt: momentoAtual}})
  let acoesDB = await DAOacao.queryMany({usuario: req.session.usuario})

  res.render('pergaminhos', {acoes: acoesDB})
}

module.exports.acaoSuditos = async (app, req, res)=>{
  req.assert('acao', 'Pelomenos uma ação deve ser selecionada!').notEmpty()
  req.assert('quantidade', 'Quantidade de aldeões não definida!').notEmpty()

  let erros = req.validationErrors()
  if(erros){
    res.redirect('/jogo?msg=A')
    return
  }

  let tempo = null
  let preco = 0

  switch(req.body.acao){
    case '1':
      tempo = 1 * 60 * 60000
      preco = 2 * req.body.quantidade
      break
    case '2':
      tempo =  2 * 60 * 60000
      preco = 3 * req.body.quantidade
      break
    case '3':
      tempo = 5 * 60 * 60000
      preco = 1 * req.body.quantidade
      break
    case '4':
      tempo = 5 * 60 * 60000
      preco = 1 * req.body.quantidade
      break
    case '5':
      tempo = 10000
      preco = 1 * req.body.quantidade
      break
  }

  const date = new Date()
  req.body.termino = date.getTime() + tempo

  const DAOacao = new app.src.model.DAOacao()
  await DAOacao.insert(req.body)
  let acaoAtual = await DAOacao.queryOne(req.body)
  await DAOacao.updateOne(acaoAtual, {usuario: req.session.usuario})

  const UsuariosDAO = new app.src.model.UsuariosDAO()
  let usuario = await UsuariosDAO.queryOne({usuario: req.session.usuario})
  
  const JogoDAO = new app.src.model.JogoDAO()
  let jogo = await JogoDAO.pesquisarPorUsuario(usuario)
  await JogoDAO.pagar(jogo, preco)

  res.redirect('/jogo?msg=B')
}

module.exports.revogar = async (app, req, res)=>{
  const DAOacao = new app.src.model.DAOacao()

  let id = req.query.id

  await DAOacao.deleteMany({_id: id})

  res.redirect('/jogo')
}
