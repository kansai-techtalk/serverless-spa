// 参考: example-projects/index.js at master · claudiajs/example-projects
// https://github.com/claudiajs/example-projects/blob/master/dynamodb-example/index.js
const ApiBuilder = require('claudia-api-builder');
const AWS = require('aws-sdk');
const uuid = require('uuid/v4');

const api = new ApiBuilder();
const dynamoDb = new AWS.DynamoDB.DocumentClient();
// DynamoDBテーブル名
const TableName = 'Todo';

// GET: /todo
api.get('/todo', () => {
  const params = {
    TableName,
  };

  // 全件取得
  return dynamoDb.scan(params).promise().then((response) => {
    // responseから項目を取得して返す
    return response.Items;
  });
}); // response codeを指定しなければ `200 OK`

// GET: /todo/{id}
api.get('/todo/{id}', (request) => {
  // ID取得
  const ID = request.pathParams.id;
  const params = {
    TableName,
    // プライマリーキーで一つ指定
    Key: {
      ID,
    },
  };

  return dynamoDb.get(params).promise().then((response) => {
    // responseから項目を取得して返す
    return response.Item;
  });
});

// POST: /todo
api.post(
  '/todo',
  async (request) => {
    // ID採番
    const ID = uuid();
    // requestからデータを取得
    const Content = request.body.Content;
    // 完了フラグは初期値false
    const Done = false;
    // 作成日時 "2019-05-02T20:42:23.992Z"
    const CreatedAt = (new Date()).toISOString();
    // パラメータ
    const params = {
      TableName,
      Item: {
        ID,
        Content,
        Done,
        CreatedAt,
        UpdatedAt: CreatedAt,
      },
    };

    await dynamoDb.put(params).promise();

    // データ取得
    const res = await dynamoDb.get({
      TableName,
      Key: {
        ID,
      },
    }).promise();

    // responseから項目を取得して返す
    return res.Item;
  },
  {
    success: 201 // response status code: 201 Created
  }
);

// PUT: /todo/{id}
api.put('/todo/{id}', async (request) => {
  // ID取得
  const ID = request.pathParams.id;
  // requestからデータを取得
  const { Content, Done } = request.body;
  // 更新日時 "2019-05-02T20:42:23.992Z"
  const UpdatedAt = (new Date()).toISOString();
  // パラメータ
  const params = {
    TableName,
    // 更新する項目のキーを指定
    Key: {
      ID,
    },
    // 更新式の定義
    // - ステップ 3: 項目を作成、読み込み、更新、削除する
    //   (https://docs.aws.amazon.com/ja_jp/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.03.html)
    UpdateExpression: 'SET Content = :c, Done = :d, UpdatedAt = :u',
    // valueの指定
    ExpressionAttributeValues: {
      ':c': Content,
      ':d': Done,
      ':u': UpdatedAt,
    },
  };

  // put: 新しい項目を作成します。同じキーを持つ項目がテーブルにすでに存在する場合は、新しい項目に置き換えられます。
  // update: 指定されたキーを持つ項目が存在しない場合は、新しい項目が作成されます。または、既存の項目の属性が変更されます。
  await dynamoDb.update(params).promise();

  const response = await dynamoDb.get({
    TableName,
    Key: {
      ID,
    },
  }).promise();

  return response.Item;
});

// DELETE: /todo/{id}
api.delete('/todo/{id}', (request) => {
  // ID取得
  const ID = request.pathParams.id;
  // パラメータ
  const params = {
    TableName,
    Key: {
      ID,
    },
  };

  return dynamoDb.delete(params).promise().then(() => {
    // 204 No Content
    return new ApiBuilder.ApiResponse('OK', { 'Content-Type': 'text/plain' }, 204);
  });
});

module.exports = api;
