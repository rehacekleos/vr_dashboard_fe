# nginx state for serving content
FROM nginx:alpine
# Set working directory to nginx asset directory

WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY /dist/docker .

RUN chgrp -R 0 /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R g+rwX /var/cache/nginx /var/run /var/log/nginx

RUN chgrp -R 0 /etc/nginx/conf.d && \
    chmod -R g+rwX /etc/nginx/conf.d

RUN chgrp -R 0 /usr/share/nginx/html/assets/docker && \
    chmod -R g+rwX /usr/share/nginx/html/assets/docker

RUN cp /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.template

RUN sed -i.bak 's/listen\(.*\)80;/listen ${NGINX_PORT};/' /etc/nginx/conf.d/default.template
RUN sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf

ENV NGINX_PORT=4000

# Containers run nginx with global directives and daemon off
CMD ["/bin/sh",  "-c",  "envsubst < /etc/nginx/conf.d/default.template > /etc/nginx/conf.d/default.conf && envsubst < /usr/share/nginx/html/assets/docker/env.template.js > /usr/share/nginx/html/assets/docker/env.js && exec nginx -g 'daemon off;'"]
