import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { GetCurrentUser } from '../apicalls/users';
// import { LoginUser } from '../apicalls/users';
import { useNavigate } from 'react-router-dom';
// import { BiUserPin } from 'react-icons/bi';
// import { GrLogout, GrNotification } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoader } from '../redux/loadersSlice';
import { SetUser } from '../redux/usersSlice';
import Notifications from './Notifications';
import {
  GetAllNotifications,
  ReadAllNotifications,
} from '../apicalls/notifications';

function ProtectedPage({ children }) {
  const [notifications = [], setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user } = useSelector((state) => state.users);
  // const isLogin = LoginUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateToken = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetCurrentUser();
      dispatch(SetLoader(false));
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        // navigate('/');
        navigate('/login');
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      // navigate('/');
      navigate('/login');
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

  useEffect(() => {
    if (localStorage.getItem('token')) {
      validateToken();
      getNotifications();
    } else {
      message.error('Please login to continue');
      navigate('/login');
    }
  }, []);

  return (
    user && (
      <div>
        {/* body */}
        <div className="p-5">{children}</div>
        {
          <Notifications
            notifications={notifications}
            reloadNotifications={getNotifications}
            showNotifications={showNotifications}
            setShowNotifications={setShowNotifications}
          />
        }
      </div>
    )
  );
}

export default ProtectedPage;
