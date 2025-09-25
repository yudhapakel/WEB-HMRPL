# Stage 1: Build base with PHP and dependencies
FROM php:8.2-fpm-alpine AS base
WORKDIR /var/www/html
RUN apk add --no-cache nginx supervisor
# Copy supervisor and nginx configs
COPY ./docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf
# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql

# Stage 2: Final application image
FROM base
# Copy Composer executable
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy ALL application files first
COPY . /var/www/html

# Now run composer install
RUN composer install --no-dev --no-interaction --optimize-autoloader

# Set correct permissions
RUN mkdir -p /var/www/html/storage/framework/sessions /var/www/html/storage/framework/views /var/www/html/storage/framework/cache /var/www/html/storage/logs /var/www/html/bootstrap/cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Expose port and start supervisord
EXPOSE 8080
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
