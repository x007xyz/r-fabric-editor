import React, { useCallback, useEffect, useState } from 'react'
import { Divider, Tooltip } from 'antd';
import { useCanvasEditor } from '@/hooks/context';
import { useMount } from 'ahooks';
import { useSelect } from '@/hooks/select';
import upSvg from '@/assets/svg/up.svg';
import downSvg from '@/assets/svg/down.svg';
import upTopSvg from '@/assets/svg/upTop.svg';
import downTopSvg from '@/assets/svg/downTop.svg';

function LayerMenu() {
  const canvasEditor = useCanvasEditor();

  const { selectId, selectIds } = useSelect();

  const [list, setList] = useState<any[]>([]);

  const [typeIcon, setTypeIcon] = useState({});

  const getList = () => {
    setList([
      ...canvasEditor.canvas.getObjects().filter((item) => {
        // return item;
        // 过滤掉辅助线
        return !(item instanceof fabric.GuideLine || item.id === 'workspace');
      }),
    ]
      .reverse()
      .map((item) => {
        const { type, id, name, text } = item;
        return {
          type,
          id,
          name,
          text,
        };
      }))
  }

  useEffect(() => {
    if (!canvasEditor) return;
    canvasEditor.canvas.preserveObjectStacking = true;
    canvasEditor.canvas.on('after:render', getList);
  }, [canvasEditor])

  useMount(() => {
    const icons = import.meta.glob(`../../assets/svg/*Layer.svg`);
    Promise.all(Object.values(icons).map(fn => fn())).then((mods) => {
      const _typeIcon = {};
      Object.keys(icons).forEach((path, index) => {
        _typeIcon[path.replace('../../assets/svg/', '').replace('Layer.svg', '')] = mods[index].default;
      })
      setTypeIcon(_typeIcon);
    });
  });

  const selectLayer = useCallback((id) => {
    const info = canvasEditor.canvas.getObjects().find((item) => item.id === id);
    canvasEditor.canvas.discardActiveObject();
    canvasEditor.canvas.setActiveObject(info);
    canvasEditor.canvas.requestRenderAll();
  }, [canvasEditor]);

  const getTypeLabel = (type) => {
    return {
      group: '组合',
      image: '图片',
      rect: '矩形',
      circle: '圆形',
      triangle: '三角形',
      polygon: '多边形',
      path: '路径',
    }[type] || '默认元素'
  }

  return (
    <div className='box'>
      <Divider orientation='left'>图层</Divider>
      <div className="layer-box">
        {list.map((item) => {
          return <div key={item.id} onClick={() => selectLayer(item.id)} className={ (selectId === item.id || selectIds.includes(item.id)) ? 'active' : '' }>
            <Tooltip title={item.name || item.text || item.type} placement='left'>
              <div className="ellipsis">
                <img src={typeIcon[item.type]} alt="" />
                {getTypeLabel(item.type)}
              </div>
            </Tooltip>
          </div>
        })}
      </div>
      {
        selectIds && selectIds.length > 0 && <div className='btn-group'>
        <img src={upSvg} alt="" onClick={() => canvasEditor.up()}/>
        <img src={downSvg} alt="" onClick={() => canvasEditor.down()}/>
        <img src={upTopSvg} alt="" onClick={() => canvasEditor.upTop()}/>
        <img src={downTopSvg} alt="" onClick={() => canvasEditor.downTop()}/>
      </div>
      }
    </div>
  )
}

export default LayerMenu