import {addNote} from './apiCalls'
import {mockNote} from './mockData'

describe('addNote', () => {
  let mockUrl;
  beforeEach(() => {
    mockUrl = 'www.mockurl.com'
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockNote)
    }))
  })

  it('should call fetch and return the added note', async () => {
    const newNote = await addNote()
    expect(window.fetch).toHaveBeenCalled()

    expect(newNote).toEqual(mockNote)
  })
})

//testing