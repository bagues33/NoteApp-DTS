import React, { useState, useEffect } from 'react'
import Home from './src/screens/home'
import AddNote from './src/screens/addNote'
import EditNote from './src/screens/editNote'

const CurrentPageWidget = ({
  currentPage,
  noteList,
  setCurrentPage,
  addNote,
  editingNoteId,
  setEditingNoteId,
  updateNote,
  deleteNoteById,
}) => {
  const editingNote = noteList.find(note => note.id === editingNoteId);

  switch (currentPage) {
    case 'home':
      return <Home noteList={noteList} setCurrentPage={setCurrentPage} setEditingNoteId={setEditingNoteId} deleteNoteById={deleteNoteById} />
    case 'add':
      // Berikan function "addNote" ke component "AddNote"
      return <AddNote setCurrentPage={setCurrentPage} addNote={addNote} />
    case 'edit':
      return <EditNote setCurrentPage={setCurrentPage} note={editingNote} updateNote={updateNote} />
    default:
      return <Home />
  }
}


const App = () => {
  const [currentPage, setCurrentPage] = useState('home')
  const [editingNoteId, setEditingNoteId] = useState(null)

  const [noteList, setNoteList] = useState([
    {
      id: 1,
      title: 'Note pertama',
      desc:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    },
  ])

  const addNote = (title, desc) => {
    const id =
      noteList.length > 0 ? noteList[noteList.length - 1].id + 1 : 1

    setNoteList([
      ...noteList,
      {
        id,
        title: title,
        desc: desc,
      },
    ])
  }

  const updateNote = (id, title, desc) => {
    const newNoteList = noteList.map((note) => {
      if (note.id === id) {
        return {
          id,
          title,
          desc,
        }
      }

      return note
    })

    setNoteList(newNoteList)
  }

  return (
    <CurrentPageWidget
      currentPage={currentPage}
      noteList={noteList}
      setCurrentPage={setCurrentPage}
      editingNoteId={editingNoteId}
      setEditingNoteId={setEditingNoteId}
      addNote={addNote}
      updateNote={updateNote}
      deleteNoteById={(id) => {
        setNoteList(noteList.filter((note) => note.id !== id))
      }}
    />
  )
}

export default App