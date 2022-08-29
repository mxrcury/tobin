import React from 'react'

const Form = ({title,handleClick}) => {
    return (
    <div>
        <h1 style={{color:'#2f2f2f'}}>{title}</h1>
        <input type="email" />
        {/* <input type="password" /> */}
        <button onClick={handleClick}>Log In</button>
    </div>
  )
}

export default Form