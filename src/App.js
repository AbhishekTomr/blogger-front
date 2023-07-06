import './App.css';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import SignIn from './component/auth/signin';
import SignUp from './component/auth/signup';
import { useEffect, useState } from 'react';
import Dashboard from './component/dashboard/dashboard';
import userContext from './context/userContext';
import UserAccount from './component/profile/account';
import { getAllBlogs, getMyBlogs } from './services/blogs';


function App() {
  const history = useHistory();
  const [user,changeUser] = useState(null);
  const [allBlogs, changeAllBlogs] = useState([]);
  const [myBlogs,toggleMyBlogs] = useState(false);

  useEffect(()=>{
    if(myBlogs)
    {
      getMyBlogs(user._id).then(response=>changeAllBlogs(response.data));
    }
    else{
      getAllBlogs().then(response=>changeAllBlogs(response.data));
    }
  },[myBlogs])



  useEffect(()=>{
    getAllBlogs().then(res=>changeAllBlogs(res.data));
  },[user])

  
  return (
    <userContext.Provider 
    value={{
    user: user, 
    updateUser: changeUser,
    allBlogs: allBlogs,
    changeAllBlogs: changeAllBlogs,
    toggleMyBlogs: toggleMyBlogs,
    }
    }>
      <div className='app-wrap'>
       <Switch>
        <Route exact path="/login" render={()=><SignIn history={history}/>} />
        <Route exact path="/signup" render={()=><SignUp history={history}/>} />      
        <Route exact path="/user/profile" render={()=><UserAccount history={history}/>} />
        <Route path="/">
            {(user) ? <Dashboard history={history}/> : <Redirect to="/login" />}
        </Route>
      </Switch>
      </div>
    
    </userContext.Provider>
      
  );
}

export default App;
