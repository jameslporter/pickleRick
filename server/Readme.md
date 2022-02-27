First use: docker-compose up -d in the parent directory.
Then signin to mongo express and create the database plumbus and collection named notes.

To allow access to plumbus hop into the mongo machine:

docker-compose exec mongo /bin/bash
mongo -u root -p e398SDc2
use plumbus
db.createUser({ user: "root", pwd: "e398SDc2",roles: [{role:'readWrite', db:'plumbus'}]})
exit