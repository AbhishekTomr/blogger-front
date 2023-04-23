const getAllBlogs = () => {
    const blogs = [];
    let users = Object.keys(window.localStorage);
    users.map(item=>{
        let user = window.localStorage.getItem(item);
        if(user)
        {
            blogs.push(...JSON.parse(user).blogs);
        }
    })
    return blogs;
}

export {getAllBlogs};