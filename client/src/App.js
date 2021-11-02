import { auth } from './firebase/firebase.config';
import { currentUser } from './api/auth';
import { onAuthStateChanged } from "firebase/auth";
import { Switch, Route } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';


import ForgotPassword from './pages/auth/ForgotPassword';
import Header from './components/nav/Header';
import Home from './components/Home';
import History from './pages/user/History';
import Password from './pages/user/Password';
import Register from './pages/auth/Register';
import RegisterComplete from './pages/auth/RegisterComplete';
import Signin from './pages/auth/Signin';

import 'antd/dist/antd.css';
import UserRoute from './components/routes/UserRoute';
import Wishlist from './pages/user/Wishlist';
import AdminRoute from './components/routes/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';




function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { token } = await user.getIdTokenResult();
        currentUser(token)
          .then(({ data: { name, email, role, _id } }) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name,
                token,
                email,
                role,
                _id,
              },
            });
          })
          .catch((error) => toast.error(error.message));
      }
    });
    return () => unsubcribe();
  }, [dispatch])
  return (
    <div className="App">
      <ToastContainer />
      <Header />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/signin" component={Signin} exact />
        <Route path="/signup" component={Register} exact />
        <Route path="/forgot/password" component={ForgotPassword} exact />
        <Route path="/signup/complete" component={RegisterComplete} />
        <UserRoute path="/user/history" component={History} />
        <UserRoute path="/user/password" component={Password} />
        <UserRoute path="/user/wishlist" component={Wishlist} />
        <AdminRoute path="/admin/dashboard" component={AdminDashboard} />
      </Switch>
    </div>
  );
}

export default App;
