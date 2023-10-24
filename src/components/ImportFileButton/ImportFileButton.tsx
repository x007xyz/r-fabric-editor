import React from 'react'
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, message, Space } from 'antd';

const onClick: MenuProps['onClick'] = ({ key }) => {
  message.info(`Click on item ${key}`);
};

const items: MenuProps['items'] = [
  {
    label: '插入图片',
    key: '1',
  },
  {
    label: '插入SVG图标',
    key: '2',
  },
  {
    label: '插入SVG字符',
    key: '3',
  },
];

function ImportFileButton() {
  return (
    <Dropdown menu={{ items, onClick }}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          插入
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  )
}

export default ImportFileButton