FROM postgres:latest


EXPOSE 5432

ENV POSTGRES_USER docker
ENV POSTGRES_PASSWORD password
ENV POSTGRES_db docker

COPY init.sql /docker-entrypoint-initdb.d/