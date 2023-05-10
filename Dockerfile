# Base image
FROM php:7.4-fpm

# Set the working directory in the container
WORKDIR /var/www/html

# Install dependencies
RUN apt-get update && apt-get install -y \
    nginx \
    supervisor

# Copy the composer.json and composer.lock from the Laravel project to the container
COPY ./api/composer.json ./api/composer.lock ./

# Install PHP dependencies
RUN apt-get install -y \
    libzip-dev \
    zip \
    && docker-php-ext-install zip

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN composer install --no-scripts --no-autoloader

# Copy the rest of the Laravel project files to the container
COPY ./api .

# Generate the autoloader
RUN composer dump-autoload

# Set up Nginx
COPY .docker/nginx/default.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ["sh", "-c", "php-fpm --daemonize && nginx -g 'daemon off;'"]
