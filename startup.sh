#!/bin/bash
mvn install
docker-compose up -d
sleep 1
docker exec -it psychometricannotator_db_1 sh -c 'mysql --password=$MYSQL_ROOT_PASSWORD documents < /test/initScript.sql'
