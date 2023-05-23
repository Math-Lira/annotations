import React, { useState, useEffect } from 'react'
import api from './services/api'

import './app.css'
import './global.css'
import './sidebar.css'
import './main.css'

import Notes from './Components/Notes'
import RedioButton from './Components/RadioButton'

function App() {
  const [ selectedValue, setSelectedValue] = useState('all')
  const [ title, setTitles ] = useState('')
  const [ notes, setNotes ] = useState('')
  const [ allNotes, setAllNotes ] = useState([])
  
  useEffect(() => {
    getAllNotes()
  }, [])
  
  async function getAllNotes() {
    const response = await api.get('./annotations')
    setAllNotes(response.data)
  }

  async function loadNotes(option) {
    const params = { priority: option}
    const response = await api.get('/priorities', { params })

    if(response) {
      setAllNotes(response.data)
    }
  }

  function handleChange(e) {
    setSelectedValue(e.value)

    if(e.checked && e.value !== 'all') {
      loadNotes(e.value)
    }else {
      getAllNotes()
    }
  }

  async function handleDelete(id) {
    const deletedNote = await api.delete(`/annotations/${id}`)

    if(deletedNote) {
      setAllNotes(allNotes.filter(notes => notes._id !== id))
    }
  } 

  async function handleChangePriority (id) {
    const note = await api.post(`/priorities/${id}`)

    if(note && selectedValue !== 'all') {
      loadNotes(selectedValue)
    }else if (note) {
      getAllNotes()
    }
  }

  async function handleSubmit (e) {
    e.preventDefault()

    const response = await api.post('/annotations', {
      title,
      notes,
      priority: false
    })

    setTitles('')
    setNotes('')

    if(selectedValue !== 'all') {
      getAllNotes()
    } else {
      setAllNotes([...allNotes, response.data])
    }
    setSelectedValue('all')
  }
  
  useEffect(() => {
    function enableSubmitButton() {
      let btn = document.getElementById('btn_submet')
      btn.style.background = "#ffb85b"
      if(title && notes) {
        btn.style.background = "#ff9101"
      }
    }
    enableSubmitButton()
  }, [title, notes])

  return (
    <div id="app">
      <aside>
        <strong>Caderno de Notas</strong>
        <form onSubmit={handleSubmit}>
          <div class="input-block">
            <label gtmlFor="title">Titulo da Anotação</label>
            <input
            required
            maxLength="30"
            value={title}
            onChange={e => setTitles(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="nota">Anotações</label>
            <textarea
            required
            value={notes}
            onChange={e => setNotes(e.target.value)}
            />
          </div>

          <button id="btn_submet" type="submit">Salvar</button>
        </form>
        <RedioButton
        selectedValue={selectedValue}
        handleChange={handleChange}
        />
      </aside>
      <main>
        <ul>
          {allNotes.map(data => (
            <Notes 
            key={data._id}
            data={data}
            handleDelete={handleDelete}
            handleChangePriority={handleChangePriority}
            />
          ))}
        </ul>
      </main>
    </div>
  )
}

export default App;
