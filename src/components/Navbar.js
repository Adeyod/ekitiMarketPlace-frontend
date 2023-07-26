import { Avatar, Badge, message, notification } from 'antd';
import React, { useEffect, useReducer, useState } from 'react';
import { GetCurrentUser } from '../apicalls/users';
import { LoginUser } from '../apicalls/users';
import { NavLink, useNavigate } from 'react-router-dom';
import { BiUserPin } from 'react-icons/bi';
import { GrLogout, GrNotification } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoader } from '../redux/loadersSlice';
import { SetUser } from '../redux/usersSlice';
import Notifications from '../components/Notifications';
import {
  GetAllNotifications,
  ReadAllNotifications,
} from '../apicalls/notifications';

// const defaultUser = async () => {
// await localStorage.getItem('token')
// }

function Navbar() {
  const [notifications = [], setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [logout, setLogout] = useState(false);
  const { user } = useSelector((state) => state.users);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  // const [ user, setUser] = useState(defaultUser);
  // const isLogin = LoginUser()
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const isLogout = () => {
  // setLogout(!logout)
  // }

  // const Logout = async () => {
  // await localStorage.clear('token')
  // setLogout(!logout)
  // }

  const validateToken = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetCurrentUser();
      dispatch(SetLoader(false));
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        navigate('/');
        // navigate('/login');
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      navigate('/');
      // navigate('/login');
      message.error(error.message);
    }
  };

  const getNotifications = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetAllNotifications();
      dispatch(SetLoader(false));
      if (response.success) {
        setNotifications(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const readNotifications = async () => {
    try {
      const response = await ReadAllNotifications();

      if (response.success) {
        getNotifications();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      validateToken();
      getNotifications();
    } else {
      message.error('Please login to continue');
      navigate('/');
      // navigate('/login');
      // isLogout()
    }
  }, []);

  return (
    <div>
      {/* header */}
      <div className="flex justify-between items-center bg-primary italic p-5 text-white">
        <h1 className="text-2xl cursor-pointer" onClick={() => navigate('/')}>
          EKITI MP
        </h1>
        {user ? (
          <div className="bg-white py-2 px-3 rounded flex gap-1 items-center">
            <span
              className="text-primary cursor-pointer underline"
              onClick={() => {
                if (user.role === 'user') {
                  navigate('/profile');
                } else {
                  navigate('/admin');
                }
              }}
            >
              {user.name}
            </span>

            <Badge
              size="default"
              onClick={() => {
                readNotifications();
                setShowNotifications(true);
              }}
              count={
                notifications?.filter((notification) => !notification.read)
                  .length
              }
              className="cursor-pointer"
            >
              <Avatar icon={<GrNotification />} />
            </Badge>

            <GrLogout
              className="text-red-500 ml-3 cursor-pointer"
              onClick={() => {
                localStorage.removeItem('token');
                // dispatch(SetLoader(true));
                navigate('/login');
                // logout = {logout}
                // setLogout = !logout
                // dispatch(SetLoader(false));
                // forceUpdate();
              }}
            />

            {
              <Notifications
                notifications={notifications}
                reloadNotifications={getNotifications}
                showNotifications={showNotifications}
                setShowNotifications={setShowNotifications}
              />
            }
          </div>
        ) : (
          <div>
            <NavLink
              to="/login"
              className="bg-white p-3 rounded mr-3 no-underline text-sky-700 font-bold"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="bg-white p-3 rounded text-sky-700 no-underline font-bold"
            >
              Register
            </NavLink>
          </div>
        )}
      </div>
    </div>

  );
}

export default Navbar;
