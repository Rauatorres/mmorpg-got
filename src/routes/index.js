module.exports = (app) => {
  app.get('/', (req, res)=>{
    res.render("index")
  })
  
  app.get('/cadastrar', (req, res)=>{
    res.render("cadastro")
  })
  
}