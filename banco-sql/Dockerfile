FROM mcr.microsoft.com/mssql/server:2017-latest
ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=Password@123


# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

RUN chmod +x /usr/src/app/scripts.sh
RUN chmod +x /usr/src/app/inicializar.sh

EXPOSE 1433

CMD /bin/bash ./inicializar.sh



