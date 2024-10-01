# 日程調整アプリケーション　 ScheduleSync

React を用いた日程調整アプリケーションです。
シンプルは日程調整アプリ「しんくる（案）」シンプル+シンクロ

## 機能

- 主催者として日程を計画できます。
- 計画した日程を共有することができます。
- 共有された日程に参加し調整、回答することができます。



## 技術スタック

本プロジェクトは以下の環境で開発されています：

- フロントエンド:
  - React: 18.3.1
  - Node.js: v16.20.2
- バックエンド:
  - Laravel: 11.25.0
  - PHP: 8.2.24
- データベース:
  - MySQL: 8.0.39

※ バージョン情報は 2024/10/02 時点のものです。

##　環境構築

初回構築時はマイグレーションを実行してください

```
docker compose exec -it php bash
```

```
# bash
php artisan migrate
```


## アクセス

- フロントエンド

```
http://localhost:3000
```

- バックエンド

```
http://localhost
```


###
各コンテナへのアクセス方法
- appコンテナ React
```
docker compose exec -it app sh
```
- phpコンテナ Laravel
```
docker compose exec -it php /bin/bash
```
