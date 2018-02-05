# BrandShortLink - Project

> Brand Short Link by TAP Technology Company Limited.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:2018
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Laravel Backend

#### SETTING JWT TOKEN

Step : 1 Install tymon/jwt-auth package in your laravel application

```bash

composer require tymon/jwt-auth:dev-develop --prefer-source

```

Step : 2 Make some changes in config/app.php file

```php

'providers' => [
	....
	Tymon\JWTAuth\Providers\LaravelServiceProvider::class,
],
'aliases' => [
	....
	'JWTAuth' => Tymon\JWTAuth\Facades\JWTAuth::class,
],

```

Step : 3 Generate configuration file

```bash

php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"

```

Step : 4 Generate JWT Token

```bash

php artisan jwt:secret

```
