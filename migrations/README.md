# Migrations

It is a good practice to separate the migrations in a centralized place to manage them, in the event that microservices are created in the future, for now we only create a monolithic containing all the endpoints in the backend folder.

# Commands

Utility commands to manage migrations


Start container responsible for migrations
```sh
docker run -it --network demo_default -v /usr/src/app/node_modules -v .:/usr/src/app --env-file .env demo-migrations /bin/sh
```

Some typeorm commands to manage migrations
```sh
# Generate migration from entities
npm run typeorm migration:generate -- -d src/data-source.ts src/migrations/<migration_name>

# Run migrations
npm run typeorm migration:run -- -d src/data-source.ts
```

In the future I plan to use another technology to manage migrations, for now let's leave it with typeorm (probably also change typeorm to another orm)