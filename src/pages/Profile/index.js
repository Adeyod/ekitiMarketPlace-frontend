import { Tabs } from 'antd';
import React from 'react';
import Products from './Products';
import Bids from './Products/Bids';

function Profile() {
  return (
    <div>
      <Tabs>
        <Tabs.TabPane tab="Products" key="1">
          <Products />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Bids" key="2">
          <h1>Bids</h1>
          {/* <Bids /> */}
        </Tabs.TabPane>
        <Tabs.TabPane tab="General" key="3">
          <h1>General</h1>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Profile;
