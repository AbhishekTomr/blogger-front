import { useState } from "react";
import Blog from "../blogs/blog";
import Header from "../layout/header";
import './dashboard.css';
import AddBlog from "../blogs/addBlog";

const Dashboard = (props) => {
    const [showAddBlog, changShowAddBlog] = useState(false);
    const [isEditMode,changeIsEditMode] = useState(false);
    const [blogData,changeBlogData] = useState({title: '', body: ''});
    const [currentBlog,changeCurrentBlog] = useState({});

    return (
        <div className='dashboard-wrap'>
            <Header 
            isLoggedIn={true}
            history={props.history}
            changeShowAddBlog = {changShowAddBlog}/>
            <AddBlog
            showAddBlog={showAddBlog}
            changeShowAddBlog={changShowAddBlog}
            isEditMode = {isEditMode}
            blogData={blogData}
            changeIsEditMode={changeIsEditMode}
            changeBlogData={changeBlogData}
            currentBlog={currentBlog}
            changeCurrentBlog={changeCurrentBlog}
            />
            <Blog
             changShowAddBlog = {changShowAddBlog}
             changeIsEditMode = {changeIsEditMode}
             changeBlogData={changeBlogData}
             changeCurrentBlog={changeCurrentBlog}
             />
        </div>
    );
}

export default Dashboard;

