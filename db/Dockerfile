FROM postgres:latest

EXPOSE 5432

ENV POSTGRES_PASSWORD password 

COPY entrypoint.sh .
RUN pwd

# ENTRYPOINT [ "./entrypoint.sh" ]