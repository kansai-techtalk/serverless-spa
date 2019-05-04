# 3. サーバーレスSPAの構築 ~SPA編~

## Amazon S3とCloudFront



## React + redux + redux-saga + react-router + Material UI

SPAのベタな構成。

### React

React – ユーザインターフェース構築のための JavaScript ライブラリ
https://ja.reactjs.org/

### Redux

Redux · A Predictable State Container for JS Apps
https://redux.js.org/

Redux入門【ダイジェスト版】10分で理解するReduxの基礎 - Qiita
https://qiita.com/kitagawamac/items/49a1f03445b19cf407b7

### redux-saga

redux-saga/README_ja.md at master · redux-saga/redux-saga
https://github.com/redux-saga/redux-saga/blob/master/README_ja.md

### react-router

React Router: Declarative Routing for React.js
https://reacttraining.com/react-router/web/guides/quick-start

### Material UI

The world's most popular React UI framework - Material-UI
https://material-ui.com/

## 実装デモ

### プロジェクトの作成

```sh
# create-react-app のインストール
$ npm install -g create-react-app
# reactプロジェクトの作成
$ create-react-app client
$ cd client
# redux のインストール
$ npm install --save redux react-redux redux-logger
# redux-saga のインストール
$ npm install --save redux-saga
# react-router のインストール
$ npm install --save react-router-dom
# material-ui のインストール
$ npm install --save @material-ui/core @material-ui/icons
# フォルダ作成
$ mkdir src/actions
$ mkdir src/reducers
$ mkdir src/sagas
$ mkdir src/components
$ mkdir src/screens
# ファイル作成
$ touch src/actions/index.js
$ touch src/reducers/index.js
$ touch src/reducers/todo.js
$ touch src/sagas/index.js
$ touch src/sagas/todo.js
$ touch src/screens/TodoList.js
$ touch src/screens/TodoEdit.js
$ touch src/components/TodoListItem.js
```

```sh
# 不要ファイルの削除
$ rm src/App.css
$ rm src/App.test.js
$ rm src/logo.svg
```

まずは下回りの実装。

reduxのactionを実装します。
前に実装したTodoAPIを呼び出し、結果を受け取るactionを定義します。


