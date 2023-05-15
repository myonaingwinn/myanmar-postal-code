# Base image
FROM php:7.4-fpm

# Set the working directory in the container
WORKDIR /var/www/html

# Install dependencies
RUN apt-get update && apt-get install -y \
    nginx \
    supervisor \
    libzip-dev \
    libssl-dev \
    zip \
    && docker-php-ext-install zip \
    && pecl install mongodb \
    && docker-php-ext-enable mongodb \
    && pecl install xdebug-3.1.5 \
    && docker-php-ext-enable xdebug

# Copy the composer.json and composer.lock from the Laravel project to the container
COPY ./api/composer.json ./api/composer.lock ./

# Install PHP dependencies
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN composer install --no-scripts --no-autoloader

# Copy the rest of the Laravel project files to the container
COPY ./api .

# Generate the autoloader
RUN composer dump-autoload

# Set up Nginx
COPY .docker/nginx/default.conf /etc/nginx/conf.d/default.conf

# Set up PHP
COPY .docker/php/php.ini /usr/local/etc/php/php.ini

# Expose port 80
EXPOSE 80

CMD ["sh", "-c", "php-fpm --daemonize && nginx -g 'daemon off;'"]
