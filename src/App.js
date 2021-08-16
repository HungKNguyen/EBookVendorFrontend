import React, { Component } from 'react'
import { Router } from 'react-router-dom'
import './App.css'
import { Main } from './components/MainComponent'
import { createBrowserHistory } from 'history'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import axios from 'axios'

export const history = createBrowserHistory()
class App extends Component {
  async getUserStart () {
    try {
      const response = await axios.create({ withCredentials: true }).get('/api/users/profile')
      localStorage.setItem('user', JSON.stringify(response.data))
    } catch (error) {
      console.log(error)
      localStorage.removeItem('user')
    }
  }

  constructor (props) {
    super(props)
    this.getUserStart()
  }

  render () {
    return (
        <Router history={history}>
          <ToastContainer />
          <Main />
        </Router>
    )
  }
}

export default App
