import React from 'react'

export const EditNote = ({ title, id, items }) => {
  //handleItemChange, if the item exists, update state
  //handleItemChange, it the item !exist, add to state
  //when you hit save, update the backend, update the store

  //will have child component EditItem: 
  //onChange to update the value in state
  //onBlur send the value in state up to Note
  
  console.log(title, id, items)
    return(
      <div>
        <p>Edit Note!</p>
        <p>{title}</p>
      </div>
    )
  
}

export default EditNote