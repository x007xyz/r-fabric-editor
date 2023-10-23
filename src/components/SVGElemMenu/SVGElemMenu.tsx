import { useFabric, useCanvasEditor } from '@/hooks/context';
import { Divider, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid';

interface materialTypeI {
  value: string;
  label: string;
  list?: materialItemI[];
}

const allType: materialTypeI = {
  value: '',
  label: '全部',
};

interface materialItemI {
  value: string;
  label: string;
  tempUrl: string;
  src: string;
}

function SVGElemMenu() {
  const fabric = useFabric()
  const canvasEditor = useCanvasEditor()

  const [state, setState] = useState({
    search: '',
    placeholder: '',
    jsonFile: null,
    materialType: [''], // 选中分类
    materialTypelist: [], // 分类列表
    materialist: [], // 列表内容
  });

  useEffect(() => {
    canvasEditor.getMaterialType('svg').then((list: materialTypeI[]) => {
      setState({
        ...state,
        materialTypelist: [...list],
        materialist: list,
      });
    });
  }, [canvasEditor])

  const defaultPosition = {
    left: 100,
    top: 100,
    shadow: '',
    fontFamily: '1-1',
  };

  const dragItem = (event) => {
    const url = event.target.src;
    // 会有性能开销 dragAddItem复用更简洁
    fabric.loadSVGFromURL(url, (objects) => {
      const item = fabric.util.groupSVGElements(objects, {
        shadow: '',
        fontFamily: 'arial',
        id: uuid(),
        name: 'svg元素',
      });
      canvasEditor.dragAddItem(event.nativeEvent, item);
    });
  };
  
  // 按照类型渲染
  const addItem = ({ src }) => {
    const url = src;
    fabric.loadSVGFromURL(url, (objects, options) => {
      const item = fabric.util.groupSVGElements(objects, {
        ...options,
        ...defaultPosition,
        id: uuid(),
        name: 'svg元素',
      });
      canvasEditor.canvas.add(item);
      canvasEditor.canvas.setActiveObject(item);
      canvasEditor.canvas.requestRenderAll();
    });
  };

  return (
    <div>
      {
        state.materialist.map(item => {
          return <div key={item.value}>
            <Divider plain orientation="left">{item.label}</Divider>
            {item.list.map((info, i) => {
              return <Tooltip
                title={info.label}
                placement="top"
                key={i}
              >
                <img
                  className="tmpl-img"
                  src={info.src}
                  draggable={true}
                  onClick={() => addItem(info)}
                  onDragEnd={dragItem}
                />
              </Tooltip>
            })}
          </div>
        })
      }
    </div>
  )
}

export default SVGElemMenu