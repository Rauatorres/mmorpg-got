module.exports.index = (app, req, res)=>{
  res.render(`index`)
}

module.exports.cadastro = (app, req, res)=>{
  res.render(`cadastro`)
}

module.exports.cadastrar = (app, req, res)=>{
  res.redirect('/')
}