import {addNote} from './apiCalls'
import {mockNote, mockErrorNote} from './mockData'
describe('api calls', () => {
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

    it('should return an error message if note was unable to be added', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.reject(
        new Error('Missing title')
      ))
      await expect(addNote(mockErrorNote)).resolves.toBe('Missing title')
    })
  })
  describe('getNotes', () => {
    it('should call fetch and return the requested notes', () => {

    })
    it('should return an error message if notes were unable to be added', () => {
      
    })
  })
  describe('removeNote', () => {
    it('should call fetch ', () => {

    })
    it('should return an error message if note was unable to be deleted', () => {
      
    })
  })
})