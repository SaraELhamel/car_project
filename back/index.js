const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const app = express()




const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cars'
})

connection.connect(err => {
    if(err) {
        return err;
    }
})

app.use(cors())

app.get('/', (req, res) =>{
    res.send('hello')
})



app.get('/car', (req, res) => {
    
  connection.query("SELECT Voiture.matricule FROM Voiture, Vente WHERE Voiture.matricule= Vente.voiture_matricule AND dat> '20201024 10:34:12 AM'", (err, resultados) => {
      if(err) {
          return res.send(err)
      } else {
          return res.json({
              data: resultados
          })
      }
  })
})
app.get('/vente', (req, res) => {
  connection.query("SELECT Voiture.matricule FROM Voiture,Vente WHERE Voiture.matricule= Vente.voiture_matricule AND prixachat-cout >= ALL (SELECT prixachat-cout FROM Voiture,Vente WHERE Voiture.matricule= Vente.voiture_matricule)", (err, resultados) => {
      if(err) {
          return res.send(err)
      } else {
          return res.json({
              data: resultados
          })
      }
  })
})
app.get('/query', (req, res) => {
  connection.query('SELECT nomv,prenomv FROM vente WHERE voiture.matricule= vente.voiture_matricule AND prixachat-cout >= ALL (SELECT prix-prixachat FROM voiture,vente WHERE voiture.matricule= vente.voiture_matricule)', (err, resultados) => {
      if(err) {
          return res.send(err)
      } else {
          return res.json({
              data: resultados
          })
      }
  })
})
app.get('/count', (req, res) => {
  connection.query(" SELECT COUNT(noma) AS nom_total FROM vente WHERE  dat='2021-06-09' AND  voiturre_matricule='az123556'", (err, resultados) => {
      if(err) {
          return res.send(err)
      } else {
          return res.json({
              data: resultados
          })
      }
  })
})

app.get('/seller', (req, res) => {
  connection.query('  SELECT SUM(salaire) FROM vendeur', (err, resultados) => {
      if(err) {
          return res.send(err)
      } else {
          return res.json({
              data: resultados
          })
      }
  })
})

app.listen(5000, () => {
    console.log('port 5000')
})