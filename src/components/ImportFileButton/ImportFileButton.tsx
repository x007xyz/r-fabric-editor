import React from 'react'
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { v4 as uuid } from 'uuid';
import { selectFiles, getImgStr } from '@/utils/utils';
import { useCanvasEditor } from '@/hooks/context';

const items: MenuProps['items'] = [
  {
    label: '插入图片',
    key: '1',
  },
  {
    label: '插入SVG图标',
    key: '2',
  },
];

function ImportFileButton() {
  const canvasEditor = useCanvasEditor();

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === '1') {
      selectFiles({ accept: 'image/*', multiple: true }).then((fileList) => {
        Array.from(fileList).forEach((item) => {
          getImgStr(item).then((file) => {
            insertImgFile(file);
          });
        });
      });
    } else if (key === '2') {
      selectFiles({ accept: '.svg', multiple: true }).then((fileList) => {
        Array.from(fileList).forEach((item) => {
          getImgStr(item).then((file) => {
            insertSvgFile(file);
          });
        });
      });
    }
  };

  // 插入文件元素
  function insertSvgFile(svgFile) {
    if (!svgFile) throw new Error('file is undefined');
    fabric.loadSVGFromURL(svgFile, (objects, options) => {
      const item = fabric.util.groupSVGElements(objects, {
        ...options,
        name: 'defaultSVG',
        id: uuid(),
      });
      canvasEditor.canvas.add(item).centerObject(item).renderAll();
    });
  }

  // 插入图片文件
  function insertImgFile(file) {
    if (!file) throw new Error('file is undefined');
    const imgEl = document.createElement('img');
    imgEl.src = file;
    // 插入页面
    document.body.appendChild(imgEl);
    imgEl.onload = () => {
      // 创建图片对象
      const imgInstance = new fabric.Image(imgEl, {
        id: uuid(),
        name: '图片1',
        left: 100,
        top: 100,
      });
      // 设置缩放
      canvasEditor.canvas.add(imgInstance);
      canvasEditor.canvas.setActiveObject(imgInstance);
      canvasEditor.canvas.renderAll();
      // 删除页面中的图片元素
      imgEl.remove();
    };
  }
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