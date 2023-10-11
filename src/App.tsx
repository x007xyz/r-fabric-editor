import { useEffect, useRef, useState } from 'react'
import { Layout } from 'antd';

const { Header, Sider, Content } = Layout;

import { fabric } from 'fabric';
import { CanvasEventEmitter } from '@/utils/event/notifier';
import './App.less'
import Editor, { AlignGuidLinePlugin, CenterAlignPlugin, ControlsPlugin, ControlsRotatePlugin, CopyPlugin, DeleteHotKeyPlugin, DownFontPlugin, DrawLinePlugin, DringPlugin, FlipPlugin, GroupAlignPlugin, GroupPlugin, GroupTextEditorPlugin, HistoryPlugin, LayerPlugin, MaterialPlugin, MoveHotKeyPlugin, RulerPlugin, WorkspacePlugin } from './core';

import Menu from "@/components/Menu"
import AttrMenu from '@/components/AttrMenu';
import FlipMenu from '@/components/FlipMenu';
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

    _canvasEditor.use(DringPlugin);
    _canvasEditor.use(AlignGuidLinePlugin);
    _canvasEditor.use(ControlsPlugin);
    _canvasEditor.use(ControlsRotatePlugin);
    _canvasEditor.use(CenterAlignPlugin);
    _canvasEditor.use(LayerPlugin);
    _canvasEditor.use(CopyPlugin);
    _canvasEditor.use(MoveHotKeyPlugin);
    _canvasEditor.use(DeleteHotKeyPlugin);
    _canvasEditor.use(GroupPlugin);
    _canvasEditor.use(DrawLinePlugin);
    _canvasEditor.use(GroupTextEditorPlugin);
    _canvasEditor.use(GroupAlignPlugin);
    _canvasEditor.use(WorkspacePlugin);
    _canvasEditor.use(DownFontPlugin);
    // _canvasEditor.use(HistoryPlugin);
    _canvasEditor.use(FlipPlugin);
    _canvasEditor.use(RulerPlugin);
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
                <Sider theme='light' width={320}>
                  <div style={{ padding: '8px', overflowY: 'auto' }}>
                    <FlipMenu></FlipMenu>
                    <AttrMenu></AttrMenu>
                  </div>
                </Sider>
              </Layout>
            </Layout>
          </SelectProvider>
        </CanvasEditorContext.Provider>
      </EventContext.Provider>
    </FabricContext.Provider>
  )
}

export default App
