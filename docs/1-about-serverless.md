# 1. AWSで構成するサーバーレス シングルページアプリケーション

## サーバーレスアーキテクチャとは？

> サーバーレス アーキテクチャとは物理サーバおよびミドルウェアやOSを含むソフトウェアレベルでのサーバの管理を行わずに、関数の実行環境や、計算環境を動いている間だけ提供するプラットフォームを使ってシステムの構成を行うこと
> 
> *- [Serverless ArchitectureとMicroservice Architectureの違いを改めて押さえておく ｜ DevelopersIO](https://dev.classmethod.jp/etc/difference-of-serverless-and-msa/)*

### 関数の実行環境

- AWS Lambda
- Azure Functions
- Google Cloud Functions

2014年にAWS Lambdaによって始まった

### AWSによるサーバーレス構成

![Serverless構成](000-serverless.jpg)

### サーバレス アーキテクチャに向くシステム

時間帯や季節によって、サービスやシステムへのアクセス数や負荷が大幅に上がるもの

一つひとつの処理自体は短時間で終わるが、大量のユーザーを捌く必要のあるもの

- テレビCMに連動したランディングページ
- イベント会場での入場管理システム


### サーバレス アーキテクチャが向かないシステム

RDBMSのトランザクション処理のようなもの

- 複数の処理をひとまとめにcommit/rollbackするのは実装が複雑になる


## シングル ページ アプリケーション とは？

> 単一のWebページのみから構成することで、デスクトップアプリケーションのようなユーザ体験を提供するWebアプリケーションまたはWebサイト
> 
> *- [シングルページアプリケーション - Wikipedia](https://ja.wikipedia.org/wiki/%E3%82%B7%E3%83%B3%E3%82%B0%E3%83%AB%E3%83%9A%E3%83%BC%E3%82%B8%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3)*

**S**ingle **P**age **A**pplication, SPAと略す

ブラウザ (クライアントサイド) でコンテンツの描画やユーザーとの対話処理の全てを実装することになります。
WebサーバーとはJSONをやり取りするのみとなるため、それぞれの役割が明確になり、システムが疎結合となります。


### SPAに向くシステム

ユーザーが頻繁にページ遷移やコンテンツの操作を行う滞在時間の長いサービス

- チケットの座席指定
- チャット
- ダッシュボード

### SPAに向かないシステム

次のような課題がある

- 検索エンジン最適化 (SEO)
- アナリティクス
- 最初の読み込みの遅延

したがって以下のようなシステムには向いていない

- ランディングページ
- ブログ

サーバーサイド レンダリング (SSR) するなどしてこれらのデメリットを解消する手法もある


## 今回取り上げるWebアプリケーションについて

ToDoアプリ

![](./009-todo-app.png)

---

## 参考

- [サーバレスアーキテクチャとは何か？～AWS LambdaとAPI Gatewayによる簡単なAPIの実装を試す (1/3)：CodeZine（コードジン）](https://codezine.jp/article/detail/10332)
- [AWSサーバレスアーキテクチャでSPAを実装する（1）～SSLを経由してブラウザからLambda APIへアクセスするまでの下準備 (1/9)：CodeZine（コードジン）](https://codezine.jp/article/detail/10365)
- [【翻訳記事】Google Cloud Functions 対 AWS Lambda: サーバーレスクラウドを制する闘いが始まる - Qiita](https://qiita.com/bump_of_kiharu/items/355a73412445c5ff59a0)
