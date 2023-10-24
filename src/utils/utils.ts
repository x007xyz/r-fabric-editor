/*
 * @Author: 秦少卫
 * @Date: 2022-09-05 22:21:55
 * @LastEditors: 秦少卫
 * @LastEditTime: 2023-07-29 21:30:41
 * @Description: 工具文件
 */

import FontFaceObserver from 'fontfaceobserver';
// import { useClipboard, useFileDialog, useBase64 } from '@vueuse/core';
import { message } from 'antd';

const useClipboard = () => {}
const useFileDialog = () => {}
const useBase64 = () => {}

interface Font {
  type: string;
  fontFamily: string;
}

/**
 * @description: 选择文件
 * @param {Object} options accept = '', capture = '', multiple = false
 * @return {Promise}
 */
export const selectFiles = (options: {
  accept?: string;
  capture?: string;
  multiple?: boolean;
}) => {
  options = { accept: "image/*", multiple: false, ...options };
  // 创建input[type="file"]
  const input = document.createElement("input");
  input.type = "file";
  // 获取选择的文件
  input.id = "upFile";
  // 设置文件类型
  input.accept = options.accept;
  // 设置是否多选
  if (options.multiple) {
    input.multiple = "multiple";
  }
  return new Promise((resolve) => {
    input.onchange = function () {
      resolve(this.files);
    };
    // 触发选择
    input.click();
  });
};

/**
 * @description: 图片文件转字符串
 * @param {Blob|File} file 文件
 * @return {String}
 */
export function getImgStr(file: File | Blob): Promise<FileReader['result']> {
  // 将文件转为base64

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  })
}

/**
 * @description: 根据json模板下载字体文件
 * @param {String} str
 * @return {Promise}
 */
export function downFontByJSON(str: string) {
  const skipFonts = ['arial', 'Microsoft YaHei'];
  const fontFamilies: string[] = JSON.parse(str)
    .objects.filter(
      (item: Font) =>
        // 为text 并且不为包含字体
        // eslint-disable-next-line implicit-arrow-linebreak
        item.type.includes('text') && !skipFonts.includes(item.fontFamily)
    )
    .map((item: Font) => item.fontFamily);
  const fontFamiliesAll = fontFamilies.map((fontName) => {
    const font = new FontFaceObserver(fontName);
    return font.load(null, 150000);
  });
  return Promise.all(fontFamiliesAll);
}

/**
 * @description: 创建图片元素
 * @param {String} str 图片地址或者base64图片
 * @return {Promise} element 图片元素
 */
export function insertImgFile(str: string) {
  return new Promise((resolve) => {
    const imgEl = document.createElement('img');
    imgEl.src = str;
    // 插入页面
    document.body.appendChild(imgEl);
    imgEl.onload = () => {
      resolve(imgEl);
    };
  });
}

/**
 * Copying text to the clipboard
 * @param source Copy source
 * @param options Copy options
 * @returns Promise that resolves when the text is copied successfully, or rejects when the copy fails.
 */
export const clipboardText = async (
  source: string,
  options?: Parameters<typeof useClipboard>[0]
) => {
  try {
    await useClipboard({ source, ...options }).copy();
    message.success('复制成功');
  } catch (error) {
    message.error('复制失败');
    throw error;
  }
};
