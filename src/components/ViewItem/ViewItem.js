import React from 'react'
import PropTypes from 'prop-types'

export const ViewItem = (props) => {
  return(
    <div className='list-container'>
      <textarea defaultValue={props.existingValue}
                className='list-item'
              >
      </textarea>
    </div>
  )
}

ViewItem.propTypes = {
  existingValue: PropTypes.string.isRequired
}

export default ViewItem