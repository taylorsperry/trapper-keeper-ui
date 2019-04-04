import {addNote} from './apiCalls'
import {mockNote, mockErrorNote} from './mockData'

describe('addNote', () => {
  
  beforeEach(() => {
    
  })

  it('should call fetch and return the added note', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockNote)
    }))
    const newNote = await addNote(mockNote)
    expect(window.fetch).toHaveBeenCalled()

    expect(newNote).toEqual(mockNote)
  })

  it('should return an error message note was unable to be added', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.reject(
      new Error('Missing title')
    ))
    await expect(addNote(mockErrorNote)).resolves.toBe('Missing title')
  })
})