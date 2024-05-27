FROM mongo:latest

# Añadir repositorio y clave GPG para mongosh
RUN apt-get update && \
    apt-get install -y wget gnupg && \
    wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add - && \
    echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/debian buster/mongodb-org/4.4 main" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list && \
    apt-get update && \
    apt-get install -y mongodb-mongosh && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copiar el script de creación de tópicos (si tienes uno)
COPY create-topics.sh /docker-entrypoint-initdb.d/create-topics.sh
RUN chmod +x /docker-entrypoint-initdb.d/create-topics.sh

# Comando para iniciar MongoDB (puede ser el comando predeterminado de la imagen mongo)
CMD ["mongod"]
