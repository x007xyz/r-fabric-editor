import { useCanvasEditor } from '@/hooks/context'
import { Button } from 'antd'
import React from 'react'

function ImportJSONButton() {
  const canvasEditor = useCanvasEditor();
  return (
    <Button type="text" onClick={() => canvasEditor.insert()}>导入文件</Button>
  )
}

export default ImportJSONButton