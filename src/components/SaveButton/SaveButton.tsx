import { useCanvasEditor } from '@/hooks/context';
import { Dropdown, MenuProps } from 'antd';
import React from 'react'

const items: MenuProps['items'] = [
  {
    label: '复制到剪切板',
    key: '1',
  },
  {
    label: '保存为图片',
    key: '2',
  },
  {
    label: '保存为SVG',
    key: '3',
  },
  {
    type: 'divider',
  },
  {
    label: '保存为JSON',
    key: '4'
  },
];

function SaveButton() {
  const canvasEditor = useCanvasEditor();
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === '1') {
      // 复制到剪切板
      canvasEditor.clipboard();
    } else if (e.key === '2') {
      canvasEditor.saveImg();
    } else if (e.key === '3') {
      canvasEditor.saveSvg();
    } else if (e.key === '4') {
      canvasEditor.saveJson();
    }
  };
  return (
    <Dropdown.Button menu={{ items, onClick: handleMenuClick }}>
      保存
    </Dropdown.Button>
  )
}

export default SaveButton