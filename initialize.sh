#!/bin/bash


read -p "WARNING: Initialization will erase all data previously collected, are you sure you want to do this [y/n]: " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
  docker-compose up -d
  sleep 1
  docker exec -it psychometricannotator_db_1 sh -c 'mysql --password=$MYSQL_ROOT_PASSWORD documents < /test/initScript.sql'
  docker exec -it psychometricannotator_imagehandler_1 sh -c '. ~/anaconda2/bin/activate image_handler && python /app/document_processor.py'
  docker exec -it psychometricannotator_imagehandler_1 sh -c 'rm -rf /input/*'
  docker exec -it psychometricannotator_imagehandler_1 sh -c 'rm -rf /output/*'
fi
