
# construir imagem
docker build -t mysql-image -f api/db/dockerfile .

# iniciar container com a imagem
docker run -d --rm --name mysql-container mysql-image

# listar imagens
docker image ls

# listar containes
docker container ls

# executar comando dentro do container
docker exec -i mysql-container mysql -uroot -pprogramadorabordo < api/db/script.sql

# acessar shell dentro do container
docker exec -it mysql-container /bin/bash

# iniciar mysql com a pasta data a partir do diretorio local
docker run -d -v %CD%/api/db/data:/var/lib/mysql --rm --name mysql-container mysql-image

# iniciar container do node vinculado ao container do mysql
docker run -d -v %CD%/api:/home/node/app -p 9001:9001 --link mysql-container --rm --name node-container node-image

# para o container
docker stop node-conteiner

# build do conteiner do php
docker build -t php-image -f website/Dockerfile .  

# iniciando coneiner do php
docker run -d -v %CD%/website:/var/www/html -p 8888:80 --link node-container --rm --name php-container php-image