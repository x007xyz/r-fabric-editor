/*
 * @Author: June
 * @Description: 
 * @Date: 2023-11-23 15:55:59
 * @LastEditors: June
 * @LastEditTime: 2023-11-23 17:01:22
 */
import { useState } from 'react'
import { Button, Modal, Input, Slider, Radio, message } from 'antd'
import { useCanvasEditor } from '@/hooks/context';
import { debounce } from 'lodash-es';
import type { RadioChangeEvent } from 'antd';

function WaterMarkButton() {
  const canvasEditor = useCanvasEditor() as any;
  const [ messageApi, contextHolder ] = message.useMessage();
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ waterMarkText, setWaterMarkText ] = useState('');
  const [ waterMarkSize, setWaterMarkSize ] = useState(24);
  const [ waterMarkPos, setWaterMarkPos ] = useState('lt');
  const [ waterMarkIsRotate, setWaterMarkIsRotate ] = useState(false);
  const font = 'serif'; // 可考虑自定义字体
  const color = '#ccc'; // 可考虑自定义颜色

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWaterMarkText(e.target.value)
  };

  const onSizeChage = (val: number) => {
    setWaterMarkSize(val);
  };

  const onPositionChange = (e: RadioChangeEvent) => {
    setWaterMarkPos(e.target.value);
  };

  const onRotateChange = (e: RadioChangeEvent) => {
    setWaterMarkIsRotate(e.target.value);
  };

  const createCanvas = (width: number, height: number) => {
    const waterCanvas = document.createElement('canvas');
    waterCanvas.width = width;
    waterCanvas.height = height;
    waterCanvas.style.position = 'fixed';
    waterCanvas.style.opacity = '0';
    waterCanvas.style.zIndex = '-1';
    return waterCanvas;
  };

  const drawWaterMark: Record<string, any> = {
    lt: (width: number, height: number, cb: (imgString: string) => void) => {
      let waterCanvas: HTMLCanvasElement | null = createCanvas(width, height);
      const w = waterCanvas.width || width;
      let ctx: CanvasRenderingContext2D | null = waterCanvas.getContext('2d')!;
      ctx.fillStyle = color;
      ctx.font = `${waterMarkSize}px ${font}`;
      ctx.fillText(waterMarkText, 10, waterMarkSize + 10, w - 20);
      cb && cb(waterCanvas.toDataURL());
      waterCanvas = null;
      ctx = null;
    },
    rt: (width: number, height: number, cb: (imgString: string) => void) => {
      let waterCanvas: HTMLCanvasElement | null = createCanvas(width, height);
      let ctx: CanvasRenderingContext2D | null = waterCanvas.getContext('2d')!;
      const w = waterCanvas.width || width;
      ctx.fillStyle = color;
      ctx.font = `${waterMarkSize}px ${font}`;
      ctx.fillText(
        waterMarkText,
        w - ctx.measureText(waterMarkText).width - 20,
        waterMarkSize + 10,
        w - 20
      );
      cb && cb(waterCanvas.toDataURL());
      waterCanvas = null;
      ctx = null;
    },
    lb: (width: number, height: number, cb: (imgString: string) => void) => {
      let waterCanvas: HTMLCanvasElement | null = createCanvas(width, height);
      let ctx: CanvasRenderingContext2D | null = waterCanvas.getContext('2d')!;
      const w = waterCanvas.width || width;
      const h = waterCanvas.height || height;
      ctx.fillStyle = color;
      ctx.font = `${waterMarkSize}px ${font}`;
      ctx.fillText(waterMarkText, 10, h - waterMarkSize, w - 20);
      cb && cb(waterCanvas.toDataURL());
      waterCanvas = null;
      ctx = null;
    },
    rb: (width: number, height: number, cb: (imgString: string) => void) => {
      let waterCanvas: HTMLCanvasElement | null = createCanvas(width, height);
      let ctx: CanvasRenderingContext2D | null = waterCanvas.getContext('2d')!;
      const w = waterCanvas.width || width;
      ctx.fillStyle = color;
      ctx.font = `${waterMarkSize}px ${font}`;
      ctx.fillText(
        waterMarkText,
        w - ctx.measureText(waterMarkText).width - 20,
        height - waterMarkSize,
        width - 20
      );
      cb && cb(waterCanvas.toDataURL());
      waterCanvas = null;
      ctx = null;
    },
    full: (width: number, height: number, cb: (imgString: string) => void) => {
      let waterCanvas: HTMLCanvasElement | null = createCanvas(width, height);
      let ctx: CanvasRenderingContext2D | null = waterCanvas.getContext('2d')!;
      const textW = ctx.measureText(waterMarkText).width + 40;
      let patternCanvas: HTMLCanvasElement | null = createCanvas(
        waterMarkIsRotate === false ? textW : textW * 2, // 若有倾斜，那么斜边都会大于直角边 按30度算2倍(简单)
        waterMarkIsRotate === false ? waterMarkSize + 20 : textW + 20
      );
      document.body.appendChild(patternCanvas);
      let ctxWater: CanvasRenderingContext2D | null = patternCanvas.getContext('2d')!;
      ctxWater.textAlign = 'left';
      ctxWater.textBaseline = 'top';
      ctxWater.font = `${waterMarkSize}px ${font}`;
      ctxWater.fillStyle = `${color}`;
      if (!waterMarkIsRotate) {
        ctxWater.fillText(waterMarkText, 10, 10);
      } else {
        ctxWater.translate(0, textW - 10);
        ctxWater.rotate((-30 * Math.PI) / 180); // 简单例子 按30度算
        ctxWater.fillText(waterMarkText, 0, 0);
      }
      ctx.fillStyle = ctx.createPattern(patternCanvas, 'repeat')!;
      ctx.fillRect(0, 0, width, height);
      cb && cb(waterCanvas.toDataURL());
      waterCanvas = null;
      patternCanvas = null;
      ctx = null;
      ctxWater = null;
    },
  };

  const showModal = debounce(function() {
    setIsModalOpen(true);
  }, 250)

  const handleCancel = () => {
    setIsModalOpen(false);
    setWaterMarkText('');
    setWaterMarkSize(24);
    setWaterMarkPos('lt');
    setWaterMarkIsRotate(false);
  };

  const handleOk = () => {
    if (!waterMarkText) {
      messageApi.warning('水印名字不能为空');
      handleCancel()
      return
    }
    const workspace = canvasEditor.canvas.getObjects().find((item: any) => item.id === 'workspace');
    const { width, height, left, top } = workspace;
    drawWaterMark[waterMarkPos](width, height, (imgString: string) => {
      canvasEditor.canvas.overlayImage = null; // 清空覆盖层
      canvasEditor.canvas.setOverlayImage(
        imgString,
        canvasEditor.canvas.renderAll.bind(canvasEditor.canvas),
        {
          left: left || 0,
          top: top || 0,
          originX: 'left',
          originY: 'top',
        }
      );
    });
    handleCancel();
  };

  return (
    <div>
      { contextHolder }
      <Button onClick={() => showModal()}>
        水印
      </Button> 
      <Modal
        title="水印配置"
        cancelText="取消"
        okText="确认"
        open={ isModalOpen }
        onOk={ handleOk }
        onCancel={ handleCancel }
        destroyOnClose={ true }
      >
        <div className="setting-item">
          <span className="mr-10px">水印名称</span>
          <Input
            className="w-320"
            v-model="waterMarkState.text"
            maxLength={20}
            onChange={ onNameChange }
            show-word-limit
            placeholder="请输入水印名称"
          />
        </div>
        <div className="setting-item">
          <span className="mr-10px">水印大小</span>

          <Slider
            className="w-320"
            min={ 18 } 
            max={ 48 }
            onAfterChange={ onSizeChage }
          />
        </div>

        <div className="setting-item">
          <span className="mr-10px">水印位置</span>

          <Radio.Group
            value={ waterMarkPos }
            onChange={ onPositionChange }
          >
            <Radio value="lt">左上角</Radio>
            <Radio value="rt">右上角</Radio>
            <Radio value="lb">左下角</Radio>
            <Radio value="rb">右下角</Radio>
            <Radio value="full">平铺</Radio>
          </Radio.Group>
        </div>
        {
          waterMarkPos === 'full' ? 
          <div
            className="setting-item" v-show="waterMarkState.position === 'full'">
            <span className="mr-10px">水印角度</span>
            <div>
              <Radio.Group
                value={ waterMarkIsRotate }
                onChange={ onRotateChange }
              >
                <Radio value={false}>横向</Radio>
                <Radio value={true}>倾斜</Radio>
              </Radio.Group>
            </div>
          </div> : null
        }
      </Modal>
    </div>
  )
}

export default WaterMarkButton