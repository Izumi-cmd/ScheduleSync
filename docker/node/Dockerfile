FROM node:16-alpine

WORKDIR /app

# 依存関係をコピーしてインストール
COPY src/frontend/package.json ./
COPY src/frontend/package-lock.json ./
RUN npm install

# アプリケーションのコードをコピー
COPY src/frontend .

EXPOSE 3000

CMD ["npm", "start"]
