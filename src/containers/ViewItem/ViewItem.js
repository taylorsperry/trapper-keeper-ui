import React from 'react';

export const ViewItem = (props) => {
    return(
      <div className='list-container'>
      <button className='list-control'></button>
      <textarea 
                defaultValue={props.existingValue}
                className='list-item'
              >
      </textarea>
    </div>
    )

}

export default ViewItem;