/*
 * @Author: 秦少卫
 * @Date: 2023-06-22 16:19:46
 * @LastEditors: 秦少卫
 * @LastEditTime: 2024-04-10 17:33:17
 * @Description: 组对齐插件
 */

import { fabric } from 'fabric';
import Editor from '../Editor';
type IEditor = Editor;

// width属性不准确，需要坐标换算
function getItemSize(item: fabric.Object, size: 'width' | 'height') {
  if (item.aCoords) {
    const arr = Object.values(item.aCoords).map((item) => item[size === 'width' ? 'x' : 'y']);

    return Math.max(...arr) - Math.min(...arr);
  }
  return 0;
}

// 获取所有元素高度
function getSelectionTotal(selection: fabric.ActiveSelection, size: 'width' | 'height', index?: number) {
  let count = 0;
  if (selection) {
    selection.forEachObject((item, i) => {
      if (index && i >= index) {
        return
      }
      count += getItemSize(item, size);
    });
  }
  return count;
}

class GroupAlignPlugin implements IPluginTempl {
  static pluginName = 'GroupAlignPlugin';
  static apis = ['left', 'right', 'xcenter', 'ycenter', 'top', 'bottom', 'xequation', 'yequation'];
  // public hotkeys: string[] = ['space'];
  constructor(public canvas: fabric.Canvas, public editor: IEditor) {}

  left() {
    const { canvas } = this;
    // const activeObject = canvas.getActiveObject();
    // if (activeObject && activeObject.type === 'activeSelection') {
    //   const activeSelection = activeObject;
    //   const activeObjectLeft = -(activeObject.width / 2);
    //   activeSelection.forEachObject((item) => {
    //     item.set({
    //       left: activeObjectLeft,
    //     });
    //     item.setCoords();
    //     canvas.renderAll();
    //   });
    // }

    const activeObject = canvas.getActiveObject();
    const selectObjects = canvas.getActiveObjects();
    if (activeObject) {
      const { left = 0 } = activeObject;
      canvas.discardActiveObject();
      selectObjects.forEach((item) => {
        const bounding = item.getBoundingRect(true);
        item.set({
          left: left - bounding.left + Number(item.left),
        });
        item.setCoords();
      });
      const activeSelection = new fabric.ActiveSelection(selectObjects, {
        canvas: canvas,
      });
      canvas.setActiveObject(activeSelection);
      canvas.requestRenderAll();
    }
  }

  right() {
    const { canvas } = this;
    // const activeObject = canvas.getActiveObject();
    // if (activeObject && activeObject.type === 'activeSelection') {
    //   const activeSelection = activeObject;
    //   const activeObjectLeft = activeObject.width / 2;
    //   activeSelection.forEachObject((item) => {
    //     item.set({
    //       left: activeObjectLeft - item.width * item.scaleX,
    //     });
    //     item.setCoords();
    //     canvas.renderAll();
    //   });
    // }

    const activeObject = canvas.getActiveObject();
    const selectObjects = canvas.getActiveObjects();
    if (activeObject) {
      const { left = 0, width = 0 } = activeObject;
      canvas.discardActiveObject();
      selectObjects.forEach((item) => {
        const bounding = item.getBoundingRect(true);
        item.set({
          left: left + width - (bounding.left + bounding.width) + Number(item.left),
        });
      });
      const activeSelection = new fabric.ActiveSelection(selectObjects, {
        canvas: canvas,
      });
      canvas.setActiveObject(activeSelection);
      canvas.requestRenderAll();
    }
  }

  xcenter() {
    const { canvas } = this;
    // const activeObject = canvas.getActiveObject();
    // if (activeObject && activeObject.type === 'activeSelection') {
    //   const activeSelection = activeObject;
    //   activeSelection.forEachObject((item) => {
    //     item.set({
    //       left: 0 - (item.width * item.scaleX) / 2,
    //     });
    //     item.setCoords();
    //     canvas.renderAll();
    //   });
    // }

    const activeObject = canvas.getActiveObject();
    const selectObjects = canvas.getActiveObjects();
    if (activeObject) {
      const { left = 0, width = 0 } = activeObject;
      canvas.discardActiveObject();
      selectObjects.forEach((item) => {
        const bounding = item.getBoundingRect(true);
        item.set({
          left: left + width / 2 - (bounding.left + bounding.width / 2) + Number(item.left),
        });
      });
      const activeSelection = new fabric.ActiveSelection(selectObjects, {
        canvas: canvas,
      });
      canvas.setActiveObject(activeSelection);
      canvas.requestRenderAll();
    }
  }

  ycenter() {
    const { canvas } = this;
    // const activeObject = canvas.getActiveObject();
    // if (activeObject && activeObject.type === 'activeSelection') {
    //   const activeSelection = activeObject;
    //   activeSelection.forEachObject((item) => {
    //     item.set({
    //       top: 0 - (item.height * item.scaleY) / 2,
    //     });
    //     item.setCoords();
    //     canvas.renderAll();
    //   });
    // }

    const activeObject = canvas.getActiveObject();
    const selectObjects = canvas.getActiveObjects();
    if (activeObject) {
      const { top = 0, height = 0 } = activeObject;
      canvas.discardActiveObject();
      selectObjects.forEach((item) => {
        const bounding = item.getBoundingRect(true);
        item.set({
          top: top + height / 2 - (bounding.top + bounding.height / 2) + Number(item.top),
        });
      });
      const activeSelection = new fabric.ActiveSelection(selectObjects, {
        canvas: canvas,
      });
      canvas.setActiveObject(activeSelection);
      canvas.requestRenderAll();
    }
  }

  top() {
    const { canvas } = this;
    // const activeObject = canvas.getActiveObject();
    // if (activeObject && activeObject.type === 'activeSelection') {
    //   const activeSelection = activeObject;
    //   const activeObjectTop = -(activeObject.height / 2);
    //   activeSelection.forEachObject((item) => {
    //     item.set({
    //       top: activeObjectTop,
    //     });
    //     item.setCoords();
    //     canvas.renderAll();
    //   });
    // }

    const activeObject = canvas.getActiveObject();
    const selectObjects = canvas.getActiveObjects();
    if (activeObject) {
      const { top = 0 } = activeObject;
      canvas.discardActiveObject();
      selectObjects.forEach((item) => {
        const bounding = item.getBoundingRect(true);
        item.set({
          top: top - bounding.top + Number(item.top),
        });
      });
      const activeSelection = new fabric.ActiveSelection(selectObjects, {
        canvas: canvas,
      });
      canvas.setActiveObject(activeSelection);
      canvas.requestRenderAll();
    }
  }

  bottom() {
    const { canvas } = this;
    // const activeObject = canvas.getActiveObject();
    // if (activeObject && activeObject.type === 'activeSelection') {
    //   const activeSelection = activeObject;
    //   const activeObjectTop = activeObject.height / 2;
    //   activeSelection.forEachObject((item) => {
    //     item.set({
    //       top: activeObjectTop - item.height * item.scaleY,
    //     });
    //     item.setCoords();
    //     canvas.renderAll();
    //   });
    // }

    const activeObject = canvas.getActiveObject();
    const selectObjects = canvas.getActiveObjects();
    if (activeObject) {
      const { top = 0, height = 0 } = activeObject;
      canvas.discardActiveObject();
      selectObjects.forEach((item) => {
        const bounding = item.getBoundingRect(true);
        item.set({
          top: top + height - (bounding.top + bounding.height) + Number(item.top),
        });
      });
      const activeSelection = new fabric.ActiveSelection(selectObjects, {
        canvas: canvas,
      });
      canvas.setActiveObject(activeSelection);
      canvas.requestRenderAll();
    }
  }

  xequation() {
    const { canvas } = this;
    const activeObject = canvas.getActiveObject();
    
    if (activeObject && activeObject instanceof fabric.ActiveSelection) {
      const activeSelection = activeObject;
      // 排序
      activeSelection._objects.sort((a, b) => (a.left || 0) - (b.left || 0));

      // 平均间距计算
      const itemSpac = getSelectionTotal(activeSelection, 'width') / (activeSelection._objects.length - 1);
      // 组原点高度
      const yHeight = Number(activeObject.width) / 2;

      activeObject.forEachObject((item, i) => {
        // 获取当前元素之前所有元素的高度
        const preHeight = getSelectionTotal(activeObject, 'width', i);
        // 顶部距离 间距 * 索引 + 之前元素高度 - 原点高度
        const top = itemSpac * i + preHeight - yHeight;
        item.set('left', top);
      });
    }

    const objects = canvas.getActiveObjects();
    canvas.discardActiveObject();
    objects.forEach((item) => {
      if (item.aCoords) {
        const arr = Object.values(item.aCoords).map((item) => item.x);
        item.set('left', 2 * (item.left || 0) - Math.min(...arr));
      }
    });

    const sel = new fabric.ActiveSelection(objects, {
      canvas: canvas,
    });
    canvas.setActiveObject(sel);
    canvas.requestRenderAll();
  }

  yequation() {
    const { canvas } = this;
    const activeObject = canvas.getActiveObject() || { top: 0, height: 0 };

    if (activeObject && activeObject instanceof fabric.ActiveSelection) {
      const activeSelection = activeObject;
      // 排序
      activeSelection._objects.sort((a, b) => (a.top || 0) - (b.top || 0));

      // 平均间距计算
      const itemSpac = getSelectionTotal(activeSelection, 'height') / (activeSelection._objects.length - 1);
      // 组原点高度
      const yHeight = Number(activeObject.height) / 2;

      activeObject.forEachObject((item: fabric.Object, i: number) => {
        // 获取当前元素之前所有元素的高度
        const preHeight = getSelectionTotal(activeSelection, 'height', i);
        // 顶部距离 间距 * 索引 + 之前元素高度 - 原点高度
        const top = itemSpac * i + preHeight - yHeight;
        item.set('top', top);
      });
    }

    const objects = canvas.getActiveObjects();
    canvas.discardActiveObject();
    objects.forEach((item) => {
      if (item.aCoords) {
        const arr = Object.values(item.aCoords).map((item) => item.y);
        item.set('top', 2 * (item.top || 0) - Math.min(...arr));
      }
    });

    const sel = new fabric.ActiveSelection(objects, {
      canvas: canvas,
    });
    canvas.setActiveObject(sel);
    canvas.requestRenderAll();
  }

  destroy() {
    console.log('pluginDestroy');
  }
}

export default GroupAlignPlugin;
