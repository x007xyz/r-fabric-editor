import React, { useEffect, useState } from 'react'
import { useCanvasEditor } from '../../hooks/context';
import { Divider, Image, List } from "antd"
import axios from 'axios';

interface materialTypeI {
  value: string;
  label: string;
  list?: materialItemI[];
}

interface materialItemI {
  value: string;
  label: string;
  tempUrl: string;
  src: string;
}

function ImportTmpl() {
  const [state, setState] = useState(() => ({
    search: '',
    placeholder: '',
    jsonFile: null,
    materialType: [''], // 选中分类
    materialTypelist: [], // 分类列表
    materialist: [], // 列表内容
  }))

  const canvasEditor = useCanvasEditor();

  useEffect(() => {
    console.log("🚀 ~ file: ImportTmpl.tsx:19 ~ ImportTmpl ~ canvasEditor:", canvasEditor)
    // 获取素材分类
    canvasEditor?.getMaterialType('template').then((list: materialTypeI[]) => {
      setState(state => ({
        ...state,
        materialTypelist: [...list],
        materialist: list,
      }))
    });
  }, [canvasEditor])

  useEffect(() => {
     // 插入文件
     state.jsonFile && canvasEditor?.insertSvgFile(state.jsonFile);
  }, [state.jsonFile])

  const getTempData = (tempUrl: string) => {
    console.log("🚀 ~ file: ImportTmpl.tsx:44 ~ getTempData ~ tempUrl:", tempUrl)
    const getTemp = axios.get(tempUrl);
    getTemp.then((res) => {
      setState({
        ...state,
        jsonFile: JSON.stringify(res.data),
      })
    })
  }

  return (
    <div>
      {state.materialist.map((item: materialTypeI) => {
        return <div key={item.label}>
          <Divider>{item.label}</Divider>
          <List
            grid={{ gutter: 16, column: 2 }} 
            dataSource={item.list}
            renderItem={(info) => (
              <List.Item>
                <div onClick={() => getTempData(info.tempUrl)}>
                  <Image width={108} height={142} alt={info.label} preview={false} src={info.src} />
                </div>
              </List.Item>
            )}>
          </List>
        </div>
      })}
    </div>
  )
}

export default ImportTmpl