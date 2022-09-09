import { useState } from 'react';


export const useInput = ()=>{
    const [value,setValue] = useState('')
    
    const onChange = (e) =>{
        setValue(e.target.value)
    }
    const clear = ()=>{
        setValue('')
    }
    const setSomeValue = (text)=>{
        setValue(text)
    }

    return{
        bind:{value,onChange},
        clear,setSomeValue
    }
}