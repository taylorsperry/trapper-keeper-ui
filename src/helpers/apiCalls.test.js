import {addNote, getNotes, updateNote} from './apiCalls'
import {mockNote, mockNoteWithoutTitle, mockNoteWithoutItems, mockEmptyNotes, mockAllNotes } from './mockData'

describe('apiCalls', () => {

  describe('addNote', () => {
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

    it('should return an error message if note is missing a title', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
          ok: false,
          status: 422,
          json: () => Promise.resolve('Missing title')
        }
      ))
      const result = await addNote(mockNoteWithoutTitle)
      expect(result).toEqual('Missing title')
    })

    it('should return an error message if note has no items', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: false, 
        status: 422,
        json: () => Promise.resolve('Missing list')
      }))
      const result = await addNote(mockNoteWithoutItems)
      expect(result).toEqual('Missing list')
    })

    it ('should return an error message if note has no title or items', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: false, 
        status: 422,
        json: () => Promise.resolve('Missing title and list')
      }))
      const result = await addNote(mockEmptyNotes)
      expect(result).toEqual('Missing title and list')
    })
  })

  describe('getNotes', () => {
    
    it('should call fetch and return all notes', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockAllNotes)
      }))
      
      const response = await getNotes()
      expect(window.fetch).toHaveBeenCalled()
      
      await expect(response).toEqual(mockAllNotes.notes)
    })
  })

  describe('updateNote', () => {

    let updatedNote = {
      id: 2,
      title: 'updatedTitle',
      items: [
        {id: '123', value: 'first'},
        {id: '234', value: 'second'},
        {id: '345', value: 'third'}
      ]
    }

    it('should return an updated note', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(updatedNote)
        }
      ))
      const expected = await updateNote(mockNote)
      expect(expected).toEqual(updatedNote)
    })

    it('should return an error if missing title or list', async () => {
      window.fetch = jest.fn(() => { return Promise.reject('Missing title and list')})
        try {
          await updateNote(mockEmptyNotes)
        } catch (error) {
          expect(error).toEqual('Missing title and list')
        }
    })
  })

  describe('removeNote', () => {
    it('should call fetch ', () => {

    })
    it('should return an error message if note was unable to be deleted', () => {
      
    })
  })
})