import { useEffect, useRef, useState } from 'react'
import { Layout } from 'antd';

const { Header, Sider, Content } = Layout;

import { fabric } from 'fabric';
import { CanvasEventEmitter } from '@/utils/event/notifier';
import './App.less'
import Editor, { MaterialPlugin, WorkspacePlugin } from './core';

import Menu from "@/components/Menu"
import ImportTmpl from '@/components/ImportTmpl';

import { FabricContext, EventContext, CanvasEditorContext } from "@/hooks/context"

import { SelectProvider } from '@/hooks/select';

function App() {

  const [event, setEvent] = useState(undefined);

  const [canvasEditor, setCanvasEditor] = useState(undefined);

  useEffect(() => {
    console.log('App useEffect')
    const _event = new CanvasEventEmitter();
    const _canvasEditor = new Editor();
    // 初始化fabric
    const canvas = new fabric.Canvas('canvas', {
      fireRightClick: true, // 启用右键，button的数字为3
      stopContextMenu: true, // 禁止默认右键菜单
      controlsAboveOverlay: true, // 超出clipPath后仍然展示控制条
    });

    // 初始化编辑器
    _canvasEditor.init(canvas);

    _canvasEditor.use(WorkspacePlugin);
    _canvasEditor.use(MaterialPlugin);

    _event.init(canvas);

    setEvent(_event);

    setCanvasEditor(_canvasEditor);
  }, [])

  function onChangeMenu(active: number) {
    console.log('onChangeMenu', active)
  }

  return (
    <FabricContext.Provider value={fabric}>
      <EventContext.Provider value={event}>
        <CanvasEditorContext.Provider value={canvasEditor}>
          <SelectProvider>
            <Layout style={{height: '100%'}}>
              <Header style={{ background: 'white' }}>header</Header>
              <Layout>
                <Sider theme='light' width={320}>
                  <Menu onChangeMenu={onChangeMenu}></Menu>
                  <div className="menu-content">
                    <ImportTmpl></ImportTmpl>
                  </div>
                </Sider>
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
          </SelectProvider>
        </CanvasEditorContext.Provider>
      </EventContext.Provider>
    </FabricContext.Provider>
  )
}

export default App
