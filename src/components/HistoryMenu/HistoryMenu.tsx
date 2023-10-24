import { useCanvasEditor } from '@/hooks/context'
import { CaretLeftFilled, CaretRightFilled } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { Tooltip } from 'antd';

function HistoryMenu() {
  const canvasEditor = useCanvasEditor()
  const [history, setHistory] = useState({
    backHistory: 0,
    forwardHistory: 0
  })
  useEffect(() => {
    canvasEditor?.on('historyChange', (historyData) => {
      console.log('historyChange', historyData)
      setHistory({
        backHistory: historyData.currentIndex + 1,
        forwardHistory: historyData.data.length - historyData.currentIndex - 1
      })
    })
  }, [canvasEditor])
  return (
    <div>
      <Tooltip title={`撤销(${history.backHistory})`}>
        <CaretLeftFilled style={{ color:  history.backHistory > 0 ? '#333' : '#eeeeee' }} onClick={() => canvasEditor.undo()}/>
      </Tooltip>
      <Tooltip title={`重做(${history.forwardHistory})`}>
        <CaretRightFilled style={{ color: history.forwardHistory > 0 ? '#333' : '#eeeeee' }} onClick={() => canvasEditor.redo()}/>
      </Tooltip>
    </div>
  )
}

export default HistoryMenu