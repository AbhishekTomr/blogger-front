const addUser = (user) => {
    try{
        window.localStorage.setItem(user.email,JSON.stringify(user));
        return {status: true, message: 'Signed Up Successfully'};
    }
    catch(e)
    {
        return {status: false, message: 'Error in Sign Up'};
    }
}

const updateUser = (user) => {
    if(user)
    {
        window.localStorage.setItem(user.email,JSON.stringify(user));
    }
}

const getUser = (email) => JSON.parse(window.localStorage.getItem(email));


export {addUser,getUser,updateUser};