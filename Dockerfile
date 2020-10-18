FROM nginx

# WORKDIR /the/workdir/path

# COPY package*.json ./

# RUN npm ci

COPY ./public/** /usr/share/nginx/html

EXPOSE 80