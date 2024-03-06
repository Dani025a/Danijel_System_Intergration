FROM postgres:latest

ENV POSTGRES_USER=user_management_user
ENV POSTGRES_PASSWORD=123
ENV POSTGRES_DB=mydatabase

COPY init.sql /docker-entrypoint-initdb.d/
