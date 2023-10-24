import { useCanvasEditor } from '@/hooks/context';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd'
import React from 'react'

function ClearButton() {
  const canvasEditor = useCanvasEditor();
  const [modal, contextHolder] = Modal.useModal();
  const confirm = () => {
    modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '是否清空画板？',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        canvasEditor.clear();
      }
    });
  }
  return (
    <div>
      {contextHolder}
      <Button onClick={confirm}>清空</Button>
    </div>
  )
}

export default ClearButton