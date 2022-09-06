import {useSelector} from 'react-redux'

const useAuth = () =>{
    const {email,token,id,username} = useSelector(state => state.user)
    
    return{
        isAuth:!!email,
        email,
        token,
        id,
        username
    }
}
export {useAuth}