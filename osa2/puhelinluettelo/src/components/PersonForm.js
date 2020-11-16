import React from 'react'

const PersonForm = ({ onSubmit, nameVal, nameOnChng, numVal, numOnChng}) => {
    return (
        <form onSubmit={onSubmit}>
        <div>
        name: <input 
            value={nameVal}
            onChange={nameOnChng}
        /><br />
        number: <input
            value={numVal}
            onChange={numOnChng}
        />
        </div>
        <div>
        <button type="submit">add</button>
        </div>
        </form>
    )
}

export default PersonForm