nest new nestjs-app
cd nestjs-app
yarn run start

//generate 1 module mới
nest g module user
nest g module note
nest g module prisma
nest g service prisma --no-spec
nest g controller user --no-spec

//giong nodemon ***
yarn start:dev

docker ps
docker ps -a

//phải đúng thư mục thì mới compose được 
ls -la
docker compose up -d
docker network ls
docker compose up -d dev-database -d
docker logs abc7096129c8
// ***
docker start dev-database

//-D: dev
yarn add -D prisma
npx prisma init

extension: prisma

npx prisma --help
//localhost === port pc
//tạo ra file migration.sql
npx prisma migrate dev
>name: tableCreation

docker exec -it dev-database bash
# whoami
# psql -U postgres -W testdb
=# \dt
=# SELECT * FROM "Note";
=# SELECT * FROM "User";
=# exit
# exit
npx prisma studio

'src/prisma/prisma.module'
'../prisma/prisma.module'

//dto: data transform object

yarn add class-validator class-transformer
yarn add argon2

npx prisma migrate dev
>name: add relationship
=# SELECT * FROM "users";

2xx thành công
4xx lỗi mạng
5xx lỗi nội bộ

"prisma:dev:deploy":"prisma migrate deploy",
"db:dev:remove": "docker compose down dev-database --volumes",
"db:dev:create": "docker compose up dev-database --detach",
"db:dev:restart": "yarn db:dev:remove && yarn db:dev:create && sleep 2 && yarn prisma:dev:deploy",

//dung de doc file .env
yarn add @nestjs/config

yarn add @nestjs/jwt passport-jwt @nestjs/passport passport
yarn add -D @types/passport-jwt
yarn add -D pactum

yarn test:e2e
