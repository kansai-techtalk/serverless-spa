# 2. サーバーレスSPAの構築 - WebAPI編

ToDoアプリのWebAPIを作っていきます

## ToDoのデータ設計

- ID
- 内容
- 完了フラグ
- 作成日時

## API設計

### REST API

Web API のソフトウェアアーキテクチャのスタイルのひとつ。
REST の原則に従っているシステムは RESTfulなシステム、 といわれます。

#### RESTの原則

##### 1. ステートレス なクライアント/サーバープロトコル  

セッションやクッキーによるセッション状態の管理を行わず、 一度のリクエスト/レスポンスで問い合わせが完了する。

##### 2. URL でリソースを一意に識別する  

`http://api.example.com/user/1/task/5` のようなURLにリクエストを投げるとuserIdが1のユーザーが持っているtaskIdが5のタスク情報を返すようなイメージ。

##### 3. HTTPメソッドでリソースを操作する

| HTTPメソッド | リソースの操作 |
| --- | --- |
| GET | リソースの取得 (Read) |
| POST | リソースの追加 (Create) |
| PUT | リソースの更新 (Update) |
| DELETE | リソースの削除 (Delete) |

##### 4. 操作の結果は HTTPのステータスコードで返す

| ステータスコード | 意味 |
| --- | --- |
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

### Swagger

[Swagger](https://swagger.io/) は REST API を設計・実装・テストするためのツール群。

今回作成するAPIの仕様は下記の通り。

https://app.swaggerhub.com/apis/Kazunori-Kimura/TodoAPI/1

![REST API](001-swagger.png)

## DynamoDBの準備

### DynamoDBとは

 > Amazon DynamoDB は、フルマネージド型の NoSQL データベースサービスで、高速で予測可能なパフォーマンスとシームレスなスケーラビリティを特長としています。
 > [Amazon DynamoDB とは - Amazon DynamoDB](https://docs.aws.amazon.com/ja_jp/amazondynamodb/latest/developerguide/Introduction.html)

### Todoテーブルの作成

Todo

| フィールド名 | データ型 | Partition Key |
| --- | --- | --- |
| ID | String | ○ |
| Content | String |  |
| Done | Boolean |  |
| CreatedAt | String |  |


## APIの実装

### API Gatewayとは

### Lambdaとは

### Cloudia.js

### CRUDの実装

### デプロイ

## 動作確認

### POSTMAN

