module.exports.index = (app, req, res)=>{
  res.render(`index`, {validacao: {}})
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
  await UsuariosDAO.insertUsuario(req.body)
  console.log(await UsuariosDAO.queryAll())
  res.redirect('/')
}