const addComment = async (comment) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(comment);

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    let req = await fetch("http://localhost:5000/api/v1/comment/add", requestOptions);
    let res = await req.json();
    return res;
}

const deleteComment = async (comment) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(comment);

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    let req = await fetch("http://localhost:5000/api/v1/comment/delete", requestOptions)
    let res = await req.json();
    return res;
    }

export {addComment,deleteComment};