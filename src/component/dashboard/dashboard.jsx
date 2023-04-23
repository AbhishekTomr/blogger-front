import { useState } from "react";
import Blog from "../blogs/blog";
import Header from "../layout/header";
import './dashboard.css';
import AddBlog from "../blogs/addBlog";

const Dashboard = (props) => {
    const [showAddBlog, changShowAddBlog] = useState(false);

    return (
        <div className='dashboard-wrap'>
            <Header 
            isLoggedIn={true}
            history={props.history}
            changeShowAddBlog = {changShowAddBlog}/>
            <AddBlog
            showAddBlog={showAddBlog}
            changeShowAddBlog={changShowAddBlog}
            />
            <Blog/>
        </div>
    );
}

export default Dashboard;

