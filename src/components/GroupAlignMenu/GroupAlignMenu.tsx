import React from 'react'
import { Tooltip, Button } from 'antd';
import { SelectMode } from '../../utils/event/types';
import { useSelect } from '@/hooks/select';
import { useCanvasEditor } from '@/hooks/context';

function GroupAlignMenu() {
  const { selectMode } = useSelect()
  const canvasEditor = useCanvasEditor()

  if (selectMode !== SelectMode.MULTI) return null
  return (
    <div className='flip-box'>
      <Tooltip title="左对齐">
        <Button type="text" onClick={() => canvasEditor.left()}>
          <svg
            t="1650442284704"
            className="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2345"
            width="14"
            height="14"
          >
            <path d="M80 24h64v976H80zM198 227h448v190H198zM198 607h746v190H198z" p-id="2346"></path>
          </svg>
        </Button>
      </Tooltip>
      <Tooltip title="水平垂直对齐">
        <Button type="text" onClick={() => canvasEditor.xcenter()}>
        <svg
          t="1650442754876"
          className="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1514"
          width="14"
          height="14"
        >
          <path
            d="M477.312 576V448H266.688a32 32 0 0 1-32-32v-192a32 32 0 0 1 32-32h210.624V34.688a34.688 34.688 0 0 1 69.376 0V192h210.624a32 32 0 0 1 32 32v192a32 32 0 0 1-32 32H546.688v128H896a32 32 0 0 1 32 32v192a32 32 0 0 1-32 32H546.688v157.312a34.688 34.688 0 1 1-69.376 0V832H128a32 32 0 0 1-32-32v-192A32 32 0 0 1 128 576h349.312z"
            fill="#666666"
            p-id="1515"
          ></path>
        </svg>
        </Button>
      </Tooltip>
      <Tooltip title="右对齐">
        <Button type="text" onClick={() => canvasEditor.right()}>
          <svg
            t="1650442299564"
            className="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2543"
            width="14"
            height="14"
          >
            <path
              d="M944 1000h-64V24h64zM826 417H378V227h448zM826 797H80V607h746z"
              p-id="2544"
            ></path>
          </svg>
        </Button>
      </Tooltip>
      <Tooltip title="上对齐">
        <Button type="text" onClick={() => canvasEditor.top()}>
          <svg
            t="1650442692910"
            className="icon"
            viewBox="0 0 1170 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1118"
            width="14"
            height="14"
          >
            <path
              d="M1170.285714 36.571429a36.571429 36.571429 0 0 1-36.571428 36.571428H36.571429a36.571429 36.571429 0 0 1 0-73.142857h1097.142857a36.571429 36.571429 0 0 1 36.571428 36.571429z m-219.428571 146.285714v512a36.571429 36.571429 0 0 1-36.571429 36.571428h-219.428571a36.571429 36.571429 0 0 1-36.571429-36.571428v-512a36.571429 36.571429 0 0 1 36.571429-36.571429h219.428571a36.571429 36.571429 0 0 1 36.571429 36.571429z m-438.857143 0v804.571428a36.571429 36.571429 0 0 1-36.571429 36.571429h-219.428571a36.571429 36.571429 0 0 1-36.571429-36.571429v-804.571428a36.571429 36.571429 0 0 1 36.571429-36.571429h219.428571a36.571429 36.571429 0 0 1 36.571429 36.571429z"
              fill="#666666"
              p-id="1119"
            ></path>
          </svg>
        </Button>
      </Tooltip>
      <Tooltip title="水平垂直对齐">
        <Button type="text" onClick={() => canvasEditor.ycenter()}>
          <svg
            t="1650442299564"
            className="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2543"
            width="14"
            height="14"
          >
            <path
              d="M944 1000h-64V24h64zM826 417H378V227h448zM826 797H80V607h746z"
              p-id="2544"
            ></path>
          </svg>
        </Button>
      </Tooltip>
      <Tooltip title="下对齐">
        <Button type="text" onClick={() => canvasEditor.bottom()}>
          <svg
            t="1650442692910"
            className="icon"
            viewBox="0 0 1170 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1118"
            width="14"
            height="14"
          >
            <path
              d="M1170.285714 36.571429a36.571429 36.571429 0 0 1-36.571428 36.571428H36.571429a36.571429 36.571429 0 0 1 0-73.142857h1097.142857a36.571429 36.571429 0 0 1 36.571428 36.571429z m-219.428571 146.285714v512a36.571429 36.571429 0 0 1-36.571429 36.571428h-219.428571a36.571429 36.571429 0 0 1-36.571429-36.571428v-512a36.571429 36.571429 0 0 1 36.571429-36.571429h219.428571a36.571429 36.571429 0 0 1 36.571429 36.571429z m-438.857143 0v804.571428a36.571429 36.571429 0 0 1-36.571429 36.571429h-219.428571a36.571429 36.571429 0 0 1-36.571429-36.571429v-804.571428a36.571429 36.571429 0 0 1 36.571429-36.571429h219.428571a36.571429 36.571429 0 0 1 36.571429 36.571429z"
              fill="#666666"
              p-id="1119"
            ></path>
          </svg>
        </Button>
      </Tooltip>
      <Tooltip title="垂直居中对齐">
        <Button type="text" onClick={() => canvasEditor.xequation()}>
          <svg
            t="1650442732396"
            className="icon"
            viewBox="0 0 1243 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1316"
            width="14"
            height="14"
          >
            <path
              d="M548.571429 472.356571h146.285714V231.643429a36.571429 36.571429 0 0 1 36.571428-36.571429h219.428572a36.571429 36.571429 0 0 1 36.571428 36.571429v240.713142h179.785143a39.643429 39.643429 0 0 1 0 79.286858H987.428571v240.713142a36.571429 36.571429 0 0 1-36.571428 36.571429h-219.428572a36.571429 36.571429 0 0 1-36.571428-36.571429V551.643429h-146.285714V950.857143a36.571429 36.571429 0 0 1-36.571429 36.571428H292.571429a36.571429 36.571429 0 0 1-36.571429-36.571428V551.643429H76.214857a39.643429 39.643429 0 1 1 0-79.286858H256V73.142857A36.571429 36.571429 0 0 1 292.571429 36.571429h219.428571a36.571429 36.571429 0 0 1 36.571429 36.571428v399.213714z"
              fill="#666666"
              p-id="1317"
            ></path>
          </svg>
        </Button>
      </Tooltip>
      <Tooltip title="垂直分布">
        <Button type="text" onClick={() => canvasEditor.yequation()}>
          <svg
            t="1650442674784"
            className="icon"
            viewBox="0 0 1170 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="920"
            width="14"
            height="14"
          >
            <path
              d="M1170.285714 987.428571a36.571429 36.571429 0 0 0-36.571428-36.571428H36.571429a36.571429 36.571429 0 0 0 0 73.142857h1097.142857a36.571429 36.571429 0 0 0 36.571428-36.571429z m-219.428571-146.285714v-512a36.571429 36.571429 0 0 0-36.571429-36.571428h-219.428571a36.571429 36.571429 0 0 0-36.571429 36.571428v512a36.571429 36.571429 0 0 0 36.571429 36.571429h219.428571a36.571429 36.571429 0 0 0 36.571429-36.571429z m-438.857143 0V36.571429a36.571429 36.571429 0 0 0-36.571429-36.571429h-219.428571a36.571429 36.571429 0 0 0-36.571429 36.571429v804.571428a36.571429 36.571429 0 0 0 36.571429 36.571429h219.428571a36.571429 36.571429 0 0 0 36.571429-36.571429z"
              fill="#666666"
              p-id="921"
            ></path>
          </svg>
        </Button>
      </Tooltip>
      <Tooltip title="水平分布">
        <Button type="text" onClick={() => canvasEditor.left()}>
          <svg
            t="1650442800956"
            className="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1910"
            width="14"
            height="14"
          >
            <path
              d="M96 0a32 32 0 0 1 32 32v960a32 32 0 0 1-64 0V32A32 32 0 0 1 96 0z m832 0a32 32 0 0 1 32 32v960a32 32 0 0 1-64 0V32a32 32 0 0 1 32-32zM384 800v-576a32 32 0 0 1 32-32h192a32 32 0 0 1 32 32v576a32 32 0 0 1-32 32h-192a32 32 0 0 1-32-32z"
              fill="#515151"
              p-id="1911"
            ></path>
          </svg>
        </Button>
      </Tooltip>
      <Tooltip title="垂直分布">
        <Button type="text" onClick={() => canvasEditor.left()}>
          <svg
            t="1650442784286"
            className="icon"
            viewBox="0 0 1170 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1712"
            width="14"
            height="14"
          >
            <path
              d="M1170.285714 36.571429a36.571429 36.571429 0 0 1-36.571428 36.571428H36.571429a36.571429 36.571429 0 0 1 0-73.142857h1097.142857a36.571429 36.571429 0 0 1 36.571428 36.571429z m0 950.857142a36.571429 36.571429 0 0 1-36.571428 36.571429H36.571429a36.571429 36.571429 0 0 1 0-73.142857h1097.142857a36.571429 36.571429 0 0 1 36.571428 36.571428zM256 365.714286h658.285714a36.571429 36.571429 0 0 1 36.571429 36.571428v219.428572a36.571429 36.571429 0 0 1-36.571429 36.571428h-658.285714a36.571429 36.571429 0 0 1-36.571429-36.571428v-219.428572a36.571429 36.571429 0 0 1 36.571429-36.571428z"
              fill="#515151"
              p-id="1713"
            ></path>
          </svg>
        </Button>
      </Tooltip>
    </div>
  )
}

export default GroupAlignMenu