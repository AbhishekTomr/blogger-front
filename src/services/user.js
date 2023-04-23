import { addUser,getUser } from "./localStorage"

const signup = (user) => {   
    const response = addUser({id: window.localStorage.length+1,...user, blogs: []});
    return response;
}

const login = (data) => {
    const user = getUser(data?.email);
    if(user)
    {
        if(user.password === data.password){
            return {status:true, message:'User Login Successfull !!!', user:user};
        }else{
            return {status: false, message: 'Incorrect Pass !!!', user: null};
        }
    }
    else{
        return {status: false, message: 'User Does Not Exist', user: null};
    }
}

export {signup,login};

