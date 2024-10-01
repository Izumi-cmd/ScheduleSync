FROM php:8.2-fpm

# 必要なパッケージのインストール
RUN apt-get update && apt-get install -y \
    default-mysql-client \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libzip-dev \
    zip \
    unzip

# PHP拡張のインストール
RUN docker-php-ext-install pdo_mysql zip

# Composerのインストール
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Laravel の依存関係をインストール
COPY src/backend/composer.json src/backend/composer.lock ./
RUN composer install --no-scripts --no-autoloader

# アプリケーションのコードをコピー
COPY src/backend .

# オートローダーを最適化
RUN composer dump-autoload --optimize

# 権限の設定
RUN chown -R www-data:www-data storage bootstrap/cache
