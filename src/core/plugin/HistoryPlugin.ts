/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: 秦少卫
 * @Date: 2023-06-20 13:06:31
 * @LastEditors: 秦少卫
 * @LastEditTime: 2023-07-04 23:37:07
 * @Description: 历史记录插件
 */

import { fabric } from 'fabric';
import Editor from '../core';
import { History } from '@/utils/history';
type IEditor = Editor;
// import { v4 as uuid } from 'uuid';

class HistoryPlugin {
  public canvas: fabric.Canvas;
  public editor: IEditor;
  static pluginName = 'HistoryPlugin';
  static apis = ['undo', 'redo', 'getHistory'];
  static events = ['historyInitSuccess', 'historyChange'];
  public hotkeys: string[] = ['ctrl+z'];
  history: any;
  constructor(canvas: fabric.Canvas, editor: IEditor) {
    this.canvas = canvas;
    this.editor = editor;

    this._init();
  }

  _init() {
    this.history = new History(10, []);
    this.canvas.on({
      'object:added': (event) => this._save(event),
      'object:modified': (event) => this._save(event),
      'selection:updated': (event) => this._save(event),
    });
  }

  getHistory() {
    return this.history;
  }
  _save(event) {
    // 过滤选择元素事件
    const isSelect = event.action === undefined && event.e;
    if (isSelect || !this.canvas) return;
    const workspace = this.canvas.getObjects().find((item) => item.id === 'workspace');
    if (!workspace) {
      return;
    }
    this.history.push(this.editor.getJson());
    this.editor.emit('historyChange', this.history);
  }

  undo() {
    console.log('undo');
    if (this.history.currentIndex >= 0) {
      this.history.back();
      this.renderCanvas();
      this.editor.emit('historyChange', this.history);
    }
  }

  redo() {
    if (this.history.currentIndex <= this.history.data.length - 1) {
      this.history.forward();
      this.renderCanvas();
      this.editor.emit('historyChange', this.history);
    }
  }

  renderCanvas = () => {
    this.history.pause();
    this.canvas.clear();
    this.canvas.loadFromJSON(this.history.value, () => {
      this.canvas.renderAll();
      this.history.resume();
    });
  };

  // 快捷键扩展回调
  hotkeyEvent(eventName: string, e: any) {
    if (eventName === 'ctrl+z' && e.type === 'keydown') {
      this.undo();
    }
  }
  destroy() {
    console.log('pluginDestroy');
  }
}

export default HistoryPlugin;
