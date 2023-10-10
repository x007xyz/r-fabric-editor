import React, { useCallback, useEffect, useState } from 'react'
import { Divider, ColorPicker, Space, InputNumber, Slider, Row, Col, Input, Select } from 'antd';
import { useCanvasEditor, useEvent } from '@/hooks/context';

function AttrMenu() {
  const [baseAttr, setBaseAttr] = useState({
    id: '',
    opacity: 0,
    angle: 0,
    fill: '#fff',
    left: 0,
    top: 0,
    strokeWidth: 0,
    strokeDashArray: [],
    stroke: '#fff',
    shadow: {
      color: '#fff',
      blur: 0,
      offsetX: 0,
      offsetY: 0,
    },
    points: {},
  })

  const canvasEditor = useCanvasEditor();

  const event = useEvent();

  const getObjectAttr = useCallback((e) => {
    console.log("🚀 ~ file: AttrMenu.tsx:40 ~ getObjectAttr ~ e:", e)
    const activeObject = canvasEditor.canvas.getActiveObject();
    // 不是当前obj，跳过
    if (e && e.target && e.target !== activeObject) return;
    console.log("🚀 ~ file: AttrMenu.tsx:65 ~ getObjectAttr ~ activeObject:", activeObject)
    if (activeObject) {
      setBaseAttr({
        id: activeObject.get('id'),
        opacity: activeObject.get('opacity') * 100,
        fill: activeObject.get('fill'),
        left: activeObject.get('left'),
        top: activeObject.get('top'),
        strokeWidth: activeObject.get('strokeWidth'),
        strokeDashArray: activeObject.get('strokeDashArray'),
        stroke: activeObject.get('stroke'),
        shadow: activeObject.get('shadow') || {},
        angle: activeObject.get('angle') || 0,
        points: activeObject.get('points') || {},
      })
    }
  }, [canvasEditor]);

  useEffect(() => {
    if (!canvasEditor || !event) return;
    event.on('selectOne', getObjectAttr);
    canvasEditor.canvas.on('object:modified', getObjectAttr);
    canvasEditor.canvas.on('object:rotating', e => {
      console.log('on object:rotating', e)
    });
    return () => {
      event.off('selectOne', getObjectAttr);
      canvasEditor.canvas.off('object:modified', getObjectAttr);
    }
  }, [canvasEditor, event])

  const strokeDashList = [
    {
      data: {
        strokeUniform: true,
        strokeDashArray: [],
        strokeLineCap: 'butt',
      },
      value: 'Stroke',
      label: 'Stroke',
    },
    {
      data: {
        strokeUniform: true,
        strokeDashArray: [1, 10],
        strokeLineCap: 'butt',
      },
      label: 'Dash-1',
      value: 'Dash-1',
    },
    {
      data: {
        strokeUniform: true,
        strokeDashArray: [1, 10],
        strokeLineCap: 'round',
      },
      label: 'Dash-2',
      value: 'Dash-2',
    },
    {
      data: {
        strokeUniform: true,
        strokeDashArray: [15, 15],
        strokeLineCap: 'square',
      },
      label: 'Dash-3',
      value: 'Dash-3',
    },
    {
      data: {
        strokeUniform: true,
        strokeDashArray: [15, 15],
        strokeLineCap: 'round',
      },
      label: 'Dash-4',
      value: 'Dash-4',
    },
    {
      data: {
        strokeUniform: true,
        strokeDashArray: [25, 25],
        strokeLineCap: 'square',
      },
      label: 'Dash-5',
      value: 'Dash-5',
    },
    {
      data: {
        strokeUniform: true,
        strokeDashArray: [25, 25],
        strokeLineCap: 'round',
      },
      label: 'Dash-6',
      value: 'Dash-6',
    },
    {
      data: {
        strokeUniform: true,
        strokeDashArray: [1, 8, 16, 8, 1, 20],
        strokeLineCap: 'square',
      },
      label: 'Dash-7',
      value: 'Dash-7',
    },
    {
      data: {
        strokeUniform: true,
        strokeDashArray: [1, 8, 16, 8, 1, 20],
        strokeLineCap: 'round',
      },
      label: 'Dash-8',
      value: 'Dash-8',
    },
  ];


  const changeCommon = (key, value) => {
    console.log("🚀 ~ file: AttrMenu.tsx:84 ~ changeCommon ~ key, value:", key, value)
    const activeObject = canvasEditor.canvas.getActiveObjects()[0];
    // 透明度特殊转换
    if (key === 'opacity') {
      activeObject && activeObject.set(key, value / 100);
    } else if (key === 'angle') {
      activeObject.rotate(value);
    } else {
      activeObject && activeObject.set(key, value);
    }
    canvasEditor.canvas.renderAll();
  
    // 更新属性
    getObjectAttr();
  };

  // 阴影设置
  const changeShadow = (key: string, value) => {
    const shadow = {
      ...baseAttr.shadow,
      [key]: value,
    };
    setBaseAttr((val) => ({
      ...val,
      shadow,
    }))
    console.log("🚀 ~ file: AttrMenu.tsx:92 ~ changeShadow ~ shadow:", shadow)
    const activeObject = canvasEditor.canvas.getActiveObjects()[0];
    activeObject && activeObject.set('shadow', new fabric.Shadow(shadow));
    canvasEditor.canvas.renderAll();
  };

  const setBorder = (option) => {
    console.log("🚀 ~ file: AttrMenu.tsx:175 ~ setBorder ~ value:", option)
    const activeObject = canvasEditor.canvas.getActiveObjects()[0];
    if (activeObject) {
      activeObject.set(option.data);
      canvasEditor.canvas.renderAll();
    }
  }
  return (
    <Space direction="vertical" style={{ display: 'flex' }}>
      <Divider>外观</Divider>
      <ColorPicker value={baseAttr.fill} onChange={(_, value) => changeCommon('fill', value)} size="middle" showText defaultFormat={'hex'}/>
      <div className='field-wrapper'>
        <div className='field-box'>
          <span>x轴：</span>
          <InputNumber value={baseAttr.left} onChange={value => changeCommon('left', value)}></InputNumber>
        </div>
        <div className='field-box'>
          <span>y轴：</span>
          <InputNumber value={baseAttr.top} onChange={value => changeCommon('top', value)}></InputNumber>
        </div>
      </div>
      <Row>
        <Col span={24}>
          <div className="field-box">
            <span>旋转：</span>
            <div style={{flex: 1}}>
              <Slider min={0} max={360} value={baseAttr.angle} onChange={value => changeCommon('angle', value)}></Slider>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div className="field-box">
            <span>透明：</span>
            <div style={{flex: 1}}>
            <Slider min={0} max={100} value={baseAttr.opacity} onChange={value => changeCommon('opacity', value)}></Slider>
            </div>
          </div>
        </Col>
      </Row>
      <Divider>边框</Divider>
      <Row>
        <Col span={12}>
          <div className="field-box">
            <span>颜色</span>
            <div style={{flex: 1}}>
              <ColorPicker value={baseAttr.stroke} onChange={(_, value) => changeCommon('stroke', value)} size="middle" showText defaultFormat={'hex'}/>
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className="field-box">
            <span>宽度</span>
            <div style={{flex: 1}}>
              <InputNumber value={baseAttr.strokeWidth} onChange={value => changeCommon('strokeWidth', value)}></InputNumber>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div className="field-box">
            <span>边框</span>
            <div style={{flex: 1}}>
              <Select style={{ width: '100%' }} options={strokeDashList} onChange={(_, option) => setBorder(option)}></Select>
            </div>
          </div>
        </Col>
      </Row>
      <Divider>阴影</Divider>
      <Row>
        <Col span={12}>
          <div className="field-box">
            <span>颜色</span>
            <div style={{flex: 1}}>
              <ColorPicker value={baseAttr.shadow.color} onChange={(_, value) => changeShadow('color', value)} size="middle" showText defaultFormat={'hex'}/>
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className="field-box">
            <span>模糊</span>
            <div style={{flex: 1}}>
              <InputNumber value={baseAttr.shadow.blur} onChange={value => changeShadow('blur', value)}></InputNumber>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <div className="field-box">
            <span>X轴</span>
            <div style={{flex: 1}}>
              <InputNumber value={baseAttr.shadow.offsetX} onChange={value => changeShadow('offsetX', value)}></InputNumber>
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className="field-box">
            <span>Y轴</span>
            <div style={{flex: 1}}>
              <InputNumber value={baseAttr.shadow.offsetY} onChange={value => changeShadow('offsetY', value)}></InputNumber>
            </div>
          </div>
        </Col>
      </Row>
      <Divider>标识</Divider>
      <Row>
        <Col span={24}>
          <div className="field-box">
            <span>ID</span>
            <div style={{ flex: 1}}>
              <Input value={baseAttr.id} onChange={value => changeCommon('id', value)}></Input>
            </div>
          </div>
        </Col>
      </Row>
    </Space>
  )
}

export default AttrMenu