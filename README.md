# ELECTRON-GENERATOR

**electron** 実行可能なコードを自動生成する。  

## Feature
- electron
- react
- typescript
- webpack

## Requirement
- npm-install-package ^2.1.0

```dosbatch
npm install
```

## Usage
### 準備
electron.generatore.js :10
```
const AppName = '{アプリ名に適宜変更}';
```

### コード生成
```dosbatch
node electron-generator.js
```

or

1. Visual Studio Codeで開く
2. [F5]キーを押す

### 結果
[ アプリ名 ] フォルダ配下にelectronのコードが生成される。

## Note
下記の環境のみ確認済み
```
Microsoft Windows 11 Home  
64ビット オペレーティング システム、x64 ベース プロセッサ
```

## Author
* Ito Naoki
* letme.thinkmore7282@gmail.com