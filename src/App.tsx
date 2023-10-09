import { useEffect, useState } from 'react'
import { Layout, Space } from 'antd';

import { GithubOutlined } from '@ant-design/icons';

const { Header, Footer, Sider, Content } = Layout;

import { fabric } from 'fabric';
import './App.less'
import Editor, { WorkspacePlugin } from './core';

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `You clicked ${count} times`
    console.log('count', count);
    // 创建编辑器
    const canvasEditor = new Editor();
    // 初始化fabric
    const canvas = new fabric.Canvas('canvas', {
      fireRightClick: true, // 启用右键，button的数字为3
      stopContextMenu: true, // 禁止默认右键菜单
      controlsAboveOverlay: true, // 超出clipPath后仍然展示控制条
    });

    // 初始化编辑器
    canvasEditor.init(canvas);

    canvasEditor.use(WorkspacePlugin);
  })

  return (
    <Layout style={{height: '100%'}}>
      <Header style={{ background: 'white' }}>header</Header>
      <Layout>
        <Sider theme='light'>left sidebar</Sider>
        <Content>
        <div id="workspace">
          <div className="canvas-box">
            <div className="inside-shadow"></div>
            <canvas id="canvas"></canvas>
          </div>
        </div>
        </Content>
        <Sider theme='light'>right sidebar</Sider>
      </Layout>
    </Layout>
  )
}

export default App
