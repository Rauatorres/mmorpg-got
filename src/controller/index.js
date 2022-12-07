module.exports.index = (app, req, res)=>{
  let cadastrado = ''
  if(req.query.cadastrado != null){
    cadastrado = req.query.cadastrado
  }else{
    cadastrado = {}
  }
  res.render(`index`, {validacao: {}, msg: cadastrado})
}

module.exports.cadastro = (app, req, res)=>{
  res.render(`cadastro`, {validacao: {}, dados: {}})
}

module.exports.cadastrar = async (app, req, res)=>{
  req.assert('nome', 'O campo "nome" é obrigatório').notEmpty()
  req.assert('usuario', 'O campo "usuário" é obrigatório').notEmpty()
  req.assert('senha', 'O campo "senha" é obrigatório').notEmpty()
  req.assert('casa', 'O campo "casa" é obrigatório').notEmpty()
  
  let erros = req.validationErrors()
  
  if(erros){
    res.render('cadastro', {dados: req.body, validacao: erros})
    return
  }
  
  const UsuariosDAO = new app.src.model.UsuariosDAO()
  const JogoDAO = new app.src.model.JogoDAO()

  await UsuariosDAO.insert(req.body)
  await JogoDAO.insert({
    usuario: req.body,
    moeda: 15,
    suditos: 10,
    temor: Math.floor(Math.random() * 1000),
    sabedoria: Math.floor(Math.random() * 1000),
    comercio: Math.floor(Math.random() * 1000),
    magia: Math.floor(Math.random() * 1000)
  })

  res.redirect('/index?cadastrado=Y')
}