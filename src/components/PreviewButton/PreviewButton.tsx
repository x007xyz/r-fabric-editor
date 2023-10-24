import { useCanvasEditor } from '@/hooks/context';
import { Button, Image } from 'antd'
import React from 'react'

function PreviewButton() {
  const canvasEditor = useCanvasEditor();

  const [visible, setVisible] = React.useState(false);

  const [imgSrc, setImgSrc] = React.useState('');

  const preview = () => {
    canvasEditor.preview().then((dataUrl) => {
      // const dataUrl = getImgUrl();
      setImgSrc(dataUrl);
      setVisible(true);
    });
  };
  return (
    <div>
      <Button onClick={() => preview()}>
        预览
      </Button>
      <Image
        style={{ display: 'none' }}
        preview={{
          visible,
          src: imgSrc,
          onVisibleChange: (value) => {
            setVisible(value);
          },
        }}
      />
    </div>
  )
}

export default PreviewButton