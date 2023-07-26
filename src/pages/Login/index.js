import { Button, Form, Input, message } from 'antd';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Divider from '../../components/Divider';
import { LoginUser } from '../../apicalls/users';
import { useDispatch } from 'react-redux';
import { SetLoader } from '../../redux/loadersSlice';

const validation = [
  {
    required: true,
    message: 'All fields are required',
  },
];

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      const response = await LoginUser(values);
      dispatch(SetLoader(false));
      console.log(response);
      if (response.success) {
        message.success(response.message);
        localStorage.setItem('token', response.data);
        window.location.href = '/';
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
      navigate('/');
    }
  }, []);

  return (
    <div className="h-screen bg-orange-600 flex justify-center items-center">
      <div className="bg-white p-5 m-4 rounded w-[450px]">
        <div className="text-center underline">
          <h3 className="italic text-primary mb-2">EKITI MARKET PLACE</h3>
          <h4>LOGIN HERE</h4>
        </div>
        <Divider />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email" rules={validation}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={validation}>
            <Input type="password" placeholder="Password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" className="mx-auto">
            login
          </Button>
          <div className="text-center">
            <span className="font-bold">
              Don't have an account?
              <Link to="/register" className="ml-2 ">
                Register
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
