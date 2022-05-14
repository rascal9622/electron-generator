const fs = require('fs');

exports.main_ts_create = () => {
  const content = `import fs from "fs";
import path from 'path';
import { app, BrowserWindow, ipcMain } from 'electron';

/**
 * BrowserWindowインスタンスを作成する関数
 */
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // 開発時にはデベロッパーツールを開く
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
    const execPath =
      process.platform === 'win32'
        ? '../node_modules/electron/dist/electron.exe'
        : '../node_modules/.bin/electron';

    require('electron-reload')(__dirname, {
      electron: path.resolve(__dirname, execPath),
    });
  }

  // レンダラープロセスをロード
  mainWindow.loadFile('dist/index.html');
};

/**
 * アプリを起動する準備が完了したら BrowserWindow インスタンスを作成し、
 * レンダラープロセス（index.htmlとそこから呼ばれるスクリプト）をロードする
 */
app.whenReady().then(async () => {
  // BrowserWindow インスタンスを作成
  createWindow();
});

// すべてのウィンドウが閉じられたらアプリを終了する
app.once('window-all-closed', () => app.quit());

ipcMain.handle("existFile", (event: Electron.IpcMainInvokeEvent, filename: string) => {
  return fs.existsSync(filename);
});`;

  fs.writeFileSync('./src/main.ts', content, 'utf-8');
}

exports.index_html_create = () => {
  const content = `<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- CSP の設定 -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self';" />

    <title>Electron Title</title>
  </head>
  <body>
    <!-- react コンポーネントのマウントポイント -->
    <div id="app"></div>
  </body>
</html>`;

  fs.writeFileSync('./src/index.html', content, 'utf-8');
}

exports.preload_ts_create = () => {
  const content = `import { contextBridge, ipcRenderer } from "electron";

export const preloadObject = {
  existFile: async (filePath: string) : Promise<boolean> => {
    const result = await ipcRenderer.invoke('existFile', filePath);
    return result;
  },
};
  
contextBridge.exposeInMainWorld('api', preloadObject);`;

  fs.writeFileSync('./src/preload.ts', content, 'utf-8');
}

exports.renderer_tsx_create = () => {
  const content = `import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';

interface States {
  filename: string;
}

class RootDiv extends React.Component<{}, States> {
  constructor(props: {}) {
    super(props);
    this.state = {
      filename: "",
    };
  }

  handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      filename: event.target.value,
    });
  };

  handleOnClick = async () => {
    const { filename } = this.state;
    const result = await window.api.existFile(filename);
    alert(\`\${filename}は\${result ? "存在しています" : "存在していません"}\`);
  };

  render = () => {
    return (
      <>
        <input type="text" onChange={this.handleOnChange} />
        <button onClick={this.handleOnClick}>検索</button>
      </>
    );
  };
}

const container = document.getElementById("app");
if (container) createRoot(container).render(<RootDiv />);`;

  fs.writeFileSync('./src/renderer.tsx', content, 'utf-8');
}

exports.global_d_ts_create = () => {
  const content = `import { preloadObject } from '../preload';

declare global {
  interface Window {
    api: typeof preloadObject;
  }
}`;

  fs.writeFileSync('./src/@types/global.d.ts', content, 'utf-8');
}
