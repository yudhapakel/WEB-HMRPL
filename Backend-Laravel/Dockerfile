# Stage 1: Build base with PHP and dependencies
FROM php:8.2-fpm-alpine AS base
WORKDIR /var/www/html
RUN apk add --no-cache nginx supervisor
# Copy supervisord config
COPY ./Backend-Laravel/docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
# Copy nginx config
COPY ./Backend-Laravel/docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./docker/nginx/nginx.conf /etc/nginx/nginx.conf

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql

# Stage 2: Build with Composer dependencies
FROM base AS vendor
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
COPY ./Backend-Laravel/database /var/www/html/database
COPY ./Backend-Laravel/composer.json ./Backend-Laravel/composer.lock /var/www/html/
RUN composer install --no-dev --no-interaction --optimize-autoloader

# Stage 3: Final application image
FROM base AS final
COPY --from=vendor /var/www/html/vendor /var/www/html/vendor
COPY ./Backend-Laravel /var/www/html
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Expose port and start supervisord
EXPOSE 8080
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]