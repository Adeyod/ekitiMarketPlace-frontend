import { Tabs } from 'antd';
import React, { useEffect } from 'react';
import Products from './Products';
import Users from './Users';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  useEffect(() => {
    if (user.role !== 'admin') {
      navigate('/');
    }
  }, []);
  return (
    <div>
      <Tabs>
        <Tabs.TabPane tab="products" key="1">
          <Products />
        </Tabs.TabPane>
        <Tabs.TabPane tab="users" key="2">
          <Users />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Admin;
