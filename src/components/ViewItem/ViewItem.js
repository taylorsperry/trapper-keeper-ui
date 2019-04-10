import React from 'react'
import PropTypes from 'prop-types'

export const ViewItem = (props) => {
  let style
  if(props.complete === 'true') {
    style = 'list-item strikethrough'
  } else {
    style = 'list-item'
  }
  return(
    <div className='list-container'>
      <textarea defaultValue={props.existingValue}
                className={style}
              >
      </textarea>
    </div>
  )
}

ViewItem.propTypes = {
  existingValue: PropTypes.string
}

export default ViewItem