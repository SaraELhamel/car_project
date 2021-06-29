import React, { Component } from 'react'
import axios from 'axios'
import './aa.css';
 


export default class App extends Component {

  constructor(props){
    super(props)
   
    this.state = {
      voiture: [],
      loading:true
    }
  }
  async getUsersData(){
    const res = await axios.get("http://localhost:5000/car")
    console.log(res.data.data)
    this.setState({loading:false, voiture: res.data.data})
    
  }
  componentDidMount(){
    console.log("hello")
    this.getUsersData()
    
  }

  render() {
    
    return (
      
      <table border="1" backgroundcolor="pink">
        <thead>
        <tr>
        <th>matricule</th>
        <th>couleur</th>
        <th>prix</th>
        <th>cout</th>
        <th>marque</th>
        <th>modele</th>
        <th>nom</th>
        <th>prénom</th>
        </tr>
        </thead>
        <tbody>
        
          {this.state.voiture.map((v) => (
            <tr>
          <td key={v.matricule}>{v.matricule}</td>
          <td key={v.couleur}>{v.couleur}</td>
          <td key={v.prix}>{v.prix}</td>
          <td key={v.cout}>{v.cout}</td>
          <td key={v.marque}>{v.marque}</td>
          <td key={v.modele}>{v.modele}</td>
          <td key={v.nomp}>{v.nomp}</td>
          <td key={v.prenomp}>{v.prenomp}</td>
          </tr>
          ))}
          
        </tbody>
        
      </table>
    )
  }
}