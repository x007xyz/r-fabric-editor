/*
 * @Author: 秦少卫
 * @Date: 2024-06-08 18:14:43
 * @LastEditors: 秦少卫
 * @LastEditTime: 2024-06-08 18:51:03
 * @Description: PSD转换为fabric.js
 */

import Psd, { Layer, NodeChild } from '@webtoon/psd';
import _ from 'lodash-es';
import { v4 as uuid } from 'uuid';

interface FabricObject {
  type: string;
  version: string;
  [key: string]: any;
}

async function psdToJson(psdFile: Psd): Promise<string> {
  // 初始化
  const json = getTransform();

  // 设置背景
  const { clipPath, workspase } = getClipPath(psdFile);
  json.clipPath = clipPath;
  json.objects.push(workspase);

  // 拍平
  const list = flattenTree(psdFile.children);

  // 转换
  const fabricChildren = await psdChildrenTransform(list);
  json.objects.push(...fabricChildren.reverse());

  // 输出文件
  const jsonStr = JSON.stringify(json, null, 2);
  return jsonStr;
}

async function psdChildrenTransform(children: Layer[]): Promise<FabricObject[]> {
  const attrTransform = (children: Layer[]) => {
    const childrensFilter = children.filter((item) => {
      // if (item.text) {
      //   item.type = 'text';
      // }
      return !item.isHidden;
    });

    return childrensFilter.map(async (item) => {
      // 公共属性映射
      const commonAttr = baseUtils([
        'left',
        'top',
        ['width', (info: any) => info.width + 50],
        'height',
        'name',
        ['visible', () => true],
        ['opacity', (info: any) => 255 / info.opacity],
        ['id', uuid],
      ])(item);

      // 类型映射
      const typeList = [
        {
          sourceType: 'Layer',
          targetType: 'image',
          attr: [],
          customTransform: async (item: Layer) => {
            const base64 = await getLayerBase64(item);
            return {
              src: base64,
            };
          },
        },
        {
          sourceType: 'text',
          targetType: 'textbox',
          attr: ['text'],
          customTransform: async (item: Layer) => {
            const style = item?.textProperties?.EngineDict.StyleRun as any
            if (style?.RunArray) {
              const { FontSize, FillColor, Tracking } = style.RunArray[0].StyleSheet.StyleSheetData;
              return {
                charSpacing: Tracking,
                fontFamily: '站酷快乐体',
                fill: getColor(FillColor.Values),
                fontSize: FontSize || 12,
              };
            }
            return;
          },
        },
      ];

      const sourceTypeKey = 'type';
      const transformTypeInfo = typeList.find((info) => info.sourceType === item[sourceTypeKey]);
      if (transformTypeInfo) {
        const baseAttr = getAttrByType(transformTypeInfo.targetType);
        const typeAttr = baseUtils(transformTypeInfo.attr)(item);
        const customTransformAttr = transformTypeInfo.customTransform
          ? await transformTypeInfo.customTransform(item)
          : null;
        return _.assign(baseAttr, commonAttr, baseAttr, typeAttr, customTransformAttr);
      }
      return {
        ...getAttrByType('textbox'),
      };
    });
  };

  const result = await Promise.all(attrTransform(children));
  return result as FabricObject[];
}

function getTransform(): { version: string; objects: FabricObject[]; clipPath: FabricObject | null } {
  return {
    version: '5.3.0',
    objects: [],
    clipPath: null,
  };
}

function baseUtils(baseAttr: any[]) {
  return function (item: any) {
    const attrs: { [key: string]: any } = {
      desc: {},
    };
    baseAttr.forEach((attrType) => {
      // 直接转换
      if (typeof attrType === 'string') {
        const value = _.get(item, attrType);
        _.set(attrs, attrType, value);
      } else {
        const [key, transform] = attrType;
        if (typeof transform === 'function') {
          const value = transform(item);
          if (value) {
            _.set(attrs, key, value);
          }
        } else {
          const value = _.get(item, transform);
          _.set(attrs, key, value);
        }
      }
    });
    return attrs;
  };
}

function getAttrByType(type: string): FabricObject {
  const typeMap: { [key: string]: FabricObject } = {
    group: {
      type: 'group',
      version: '5.3.0',
      originX: 'left',
      originY: 'top',
      fill: 'rgb(0,0,0)',
      stroke: null,
      strokeWidth: 0,
      strokeDashArray: null,
      strokeLineCap: 'butt',
      strokeDashOffset: 0,
      strokeLineJoin: 'miter',
      strokeUniform: false,
      strokeMiterLimit: 4,
      scaleX: 1,
      scaleY: 1,
      flipX: false,
      flipY: false,
      shadow: null,
      visible: true,
      backgroundColor: '',
      fillRule: 'nonzero',
      paintFirst: 'fill',
      globalCompositeOperation: 'source-over',
      skewX: 0,
      skewY: 0,
      selectable: true,
      hasControls: true,
    },
    textbox: {
      type: 'textbox',
      version: '5.3.0',
      originX: 'left',
      originY: 'top',
      fill: 'rgb(0,0,0)',
      stroke: null,
      strokeWidth: 1,
      strokeDashArray: null,
      strokeLineCap: 'butt',
      strokeDashOffset: 0,
      strokeLineJoin: 'miter',
      strokeUniform: false,
      strokeMiterLimit: 4,
      scaleX: 1,
      scaleY: 1,
      angle: 0,
      flipX: false,
      flipY: false,
      shadow: '',
      backgroundColor: '',
      fillRule: 'nonzero',
      paintFirst: 'fill',
      globalCompositeOperation: 'source-over',
      skewX: 0,
      skewY: 0,
      fontFamily: 'arial',
      fontWeight: 'normal',
      fontSize: 80,
      text: '诸事顺遂',
      underline: false,
      overline: false,
      linethrough: false,
      textAlign: 'left',
      fontStyle: 'normal',
      lineHeight: 1.16,
      textBackgroundColor: '',
      charSpacing: 0,
      styles: [],
      direction: 'ltr',
      path: null,
      pathStartOffset: 0,
      pathSide: 'left',
      pathAlign: 'baseline',
      minWidth: 20,
      splitByGrapheme: true,
      selectable: true,
      hasControls: true,
    },
    image: {
      type: 'image',
      version: '5.3.0',
      originX: 'left',
      originY: 'top',
      fill: 'rgb(0,0,0)',
      stroke: null,
      strokeWidth: 0,
      strokeDashArray: null,
      strokeLineCap: 'butt',
      strokeDashOffset: 0,
      strokeLineJoin: 'miter',
      strokeUniform: false,
      strokeMiterLimit: 4,
      scaleX: 1,
      scaleY: 1,
      angle: 0,
      flipX: false,
      flipY: false,
      shadow: null,
      backgroundColor: '',
      fillRule: 'nonzero',
      paintFirst: 'fill',
      globalCompositeOperation: 'source-over',
      skewX: 0,
      skewY: 0,
      cropX: 0,
      cropY: 0,
      selectable: true,
      hasControls: true,
      src: '',
      crossOrigin: 'anonymous',
      filters: [],
    },
    rect: {
      type: 'rect',
      version: '5.3.0',
      originX: 'center',
      originY: 'center',
      left: 0,
      top: 0,
      width: 226,
      height: 302,
      fill: 'rgb(0,0,0)',
      stroke: null,
      strokeWidth: 1,
      strokeDashArray: null,
      strokeLineCap: 'butt',
      strokeDashOffset: 0,
      strokeLineJoin: 'miter',
      strokeUniform: false,
      strokeMiterLimit: 4,
      scaleX: 1,
      scaleY: 1,
      angle: 0,
      flipX: false,
      flipY: false,
      opacity: 1,
      shadow: null,
      visible: true,
      backgroundColor: '',
      fillRule: 'nonzero',
      paintFirst: 'fill',
      globalCompositeOperation: 'source-over',
      skewX: 0,
      skewY: 0,
      rx: 0,
      ry: 0,
      selectable: true,
      hasControls: true,
      inverted: false,
      absolutePositioned: false,
    },
  };
  return typeMap[type];
}

function getClipPath(psdFile: Psd): { clipPath: FabricObject; workspase: FabricObject } {
  const { width, height } = psdFile;
  const clipPath: FabricObject = {
    type: 'rect',
    version: '5.3.0',
    originX: 'left',
    originY: 'top',
    left: 0,
    top: 0,
    width: width,
    height: height,
    fill: 'rgba(255,255,255,1)',
    stroke: null,
    strokeWidth: 0,
    strokeDashArray: null,
    strokeLineCap: 'butt',
    strokeDashOffset: 0,
    strokeLineJoin: 'miter',
    strokeUniform: false,
    strokeMiterLimit: 4,
    scaleX: 1,
    scaleY: 1,
    angle: 0,
    flipX: false,
    flipY: false,
    opacity: 1,
    shadow: null,
    visible: true,
    backgroundColor: '',
    fillRule: 'nonzero',
    paintFirst: 'fill',
    globalCompositeOperation: 'source-over',
    skewX: 0,
    skewY: 0,
    rx: 0,
    ry: 0,
    selectable: true,
    hasControls: true,
  };
  const workspase: FabricObject = {
    type: 'rect',
    version: '5.3.0',
    originX: 'left',
    originY: 'top',
    left: 0,
    top: 0,
    width: width,
    height: height,
    fill: 'rgba(255,255,255,1)',
    stroke: null,
    strokeWidth: 0,
    strokeDashArray: null,
    strokeLineCap: 'butt',
    strokeDashOffset: 0,
    strokeLineJoin: 'miter',
    strokeUniform: false,
    strokeMiterLimit: 4,
    scaleX: 1,
    scaleY: 1,
    angle: 0,
    flipX: false,
    flipY: false,
    shadow: null,
    visible: true,
    backgroundColor: '',
    fillRule: 'nonzero',
    paintFirst: 'fill',
    globalCompositeOperation: 'source-over',
    skewX: 0,
    skewY: 0,
    rx: 0,
    ry: 0,
    id: 'workspace',
    selectable: false,
    hasControls: true,
  };
  return { clipPath, workspase };
}

async function getLayerBase64(layer: Layer): Promise<string> {
  try {
    const compositeBuffer = await layer.composite();
    const canvasElement = document.createElement('canvas');
    const context = canvasElement.getContext('2d');
    if (!context) {
      return ''
    }
    const imageData = new ImageData(compositeBuffer, layer.width, layer.height);
    canvasElement.width = layer.width;
    canvasElement.height = layer.height;
    context.putImageData(imageData, 0, 0);
    const base64 = canvasElement.toDataURL('image/png');
    return base64;
  } catch (error) {
    return '';
  }
}

function getColor(arr: number[]): string {
  const [, r, g, b] = arr;
  return `rgb(${r * 255}, ${g * 255}, ${b * 255})`;
}

function flattenTree(tree: NodeChild[]): Layer[] {
  const result: Layer[] = [];

  function traverse(nodes: NodeChild[]) {
    nodes.forEach((node) => {
      if (node.children) {
        traverse(node.children); // 递归遍历子节点
      } else {
        result.push(node); // 将当前节点添加到结果数组中
      }
    });
  }

  traverse(tree);
  return result;
}

export default psdToJson;
