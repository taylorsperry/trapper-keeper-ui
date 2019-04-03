export const addNote = async (note) => {
  const url = 'http://localhost:3001/api/v1/notes'
  console.log(note)
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