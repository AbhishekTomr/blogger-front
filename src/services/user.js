const signup = async (user) => {   
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        ...user, blogs: []
    });

    console.log("sending user to sign up",raw);

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    const req = await fetch("http://localhost:5000/api/v1/sign-up", requestOptions);
    const res = await req.json();
    return res;
}

const login = async (data) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        ...data
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    const req = await fetch("http://localhost:5000/api/v1/sign-in", requestOptions)
    const res = await req.json();
    return res;
    }

const getUserInfo = async (userId)=>
{

    var requestOptions = {
    method: 'GET',
    redirect: 'follow'
    };

    let req = await fetch(`http://localhost:5000/api/v1/getUser/${userId}`, requestOptions)
    let response = await req.json();
    return response;
   
}

export {signup,login,getUserInfo};

