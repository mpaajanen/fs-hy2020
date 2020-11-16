import React from 'react'

const Filter = ({ val, handle }) => {
    return(
      <input value={val} onChange={handle} />
    )
  }

export default Filter