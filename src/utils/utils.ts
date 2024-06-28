/**
 * @description: 图片文件转字符串
 * @param {Blob|File} file 文件
 * @return {String}
 */
export function getImgStr(file: File | Blob): Promise<FileReader['result']> {
  // return useBase64(file).promise.value;
  // 文件转base64
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

/**
 * @description: 选择文件
 * @param {Object} options accept = '', capture = '', multiple = false
 * @return {Promise}
 */
export function selectFiles(options: {
  accept?: string;
  capture?: string;
  multiple?: boolean;
}): Promise<FileList | null> {
  return new Promise((resolve, reject) => {
    // 创建input[file]元素
    const input = document.createElement('input')
    // 设置相应属性
    input.setAttribute('type', 'file')
    if (options.capture) {
      input.setAttribute('capture', options.capture)
    }
    input.setAttribute('accept', options.accept || "*")
    options.multiple
      ? input.setAttribute('multiple', 'multiple')
      : input.removeAttribute('multiple')
    // 绑定事件
    input.onchange = (event) => {
      // 获取文件列表
      resolve((event.target as HTMLInputElement).files)
    }

    input.oncancel = function () {
      reject(new Error('No files selected'))
    }
    input.click()
  })
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

export default {
  getImgStr,
  selectFiles,
  insertImgFile
};
