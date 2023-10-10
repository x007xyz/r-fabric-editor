import { fabric } from 'fabric';
import type Editor from '../core';
import { SelectEvent, SelectMode } from '@/utils/event/types';

// import { t } from '@/language/index';
import event from '@/utils/event/notifier';

export default class FlipPlugin {
  public canvas: fabric.Canvas;
  public editor: Editor;
  static pluginName = 'FlipPlugin';
  static apis = ['flip'];
  selectedMode: SelectMode;
  constructor(canvas: fabric.Canvas, editor: Editor) {
    this.canvas = canvas;
    this.editor = editor;
    this.selectedMode = SelectMode.EMPTY;

    this.init();
  }

  init() {
    event.on(SelectEvent.ONE, () => (this.selectedMode = SelectMode.ONE));
    event.on(SelectEvent.MULTI, () => (this.selectedMode = SelectMode.MULTI));
    event.on(SelectEvent.CANCEL, () => (this.selectedMode = SelectMode.EMPTY));
  }

  flip(type: 'X' | 'Y') {
    const activeObject = this.canvas.getActiveObject();
    if (activeObject) {
      activeObject.set(`flip${type}`, !activeObject[`flip${type}`]).setCoords();
      this.canvas.requestRenderAll();
    }
  }

  contextMenu() {
    if (this.selectedMode === SelectMode.ONE) {
      return [
        {
          text: '翻转',
          hotkey: '❯',
          subitems: [
            {
              text: t('flip.x'),
              hotkey: '|',
              onclick: () => this.flip('X'),
            },
            {
              text: t('flip.y'),
              hotkey: '-',
              onclick: () => this.flip('Y'),
            },
          ],
        },
      ];
    }
  }

  destroy() {
    console.log('pluginDestroy');
  }
}
