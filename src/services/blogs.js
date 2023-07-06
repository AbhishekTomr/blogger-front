const getAllBlogs = async () => {
    var requestOptions = {
    method: 'GET',
    redirect: 'follow'
    };

    let req = await fetch("http://localhost:5000/api/v1/allblogs", requestOptions);
    let response = await req.json();
    return response;
}

const getMyBlogs = async (id) => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
     let req = await fetch(`http://localhost:5000/api/v1/myblogs/${id}`, requestOptions)
     let response = await req.json();
     return response;
}

const addBlog = async (blogData) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(blogData);

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    const req = await fetch("http://localhost:5000/api/v1/blogs/add", requestOptions)
    const response = await req.json();
    return response;
}

const deleteBlog = async (blogId) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
         _id: blogId
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        const req = await fetch("http://localhost:5000/api/v1/blogs/delete", requestOptions)
        const response = await req.json();
        return response;
}

const updateBlog = async (blog) => {
    console.log("updated blog recived",blog);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(blog);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
    const req = await fetch("http://localhost:5000/api/v1/blogs/update", requestOptions)
    const response = await req.json();
    return response;
}

export {getAllBlogs,addBlog,deleteBlog,updateBlog, getMyBlogs};