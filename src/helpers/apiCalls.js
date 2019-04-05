export const addNote = async (note) => {
  const url = 'http://localhost:3001/api/v1/notes'
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(note),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const addedNote = await response.json()
    return addedNote;
  } catch (error) {
    return error.message
  }
}

export const getNotes = async () => {
  const url = 'http://localhost:3001/api/v1/notes'
  try {
    const response = await fetch(url);
    const allNotes = await response.json();
    return allNotes.notes
  } catch (error) {
    return error.message
  }
}

export const removeNote = async (id) => {
  const url = `http://localhost:3001/api/v1/notes/${id}`
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      body: JSON.stringify(id),
      headers: {
        'Content-Type': 'application/json'
      },
    })

  } catch(error) {
    return error.message
  }
}