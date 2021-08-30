CREATE TABLE "users" (
	"id" SERIAL PRIMARY KEY,
	"login" VARCHAR(50) NOT NULL UNIQUE,
	"pass" VARCHAR(50) NOT NULL
);

CREATE TABLE "links" (
	"id" BIGSERIAL PRIMARY KEY,
	"origin" VARCHAR(150) NOT NULL,
	"short" VARCHAR(50) NOT NULL UNIQUE,
	"date" DATE DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"owner" INTEGER NOT NULL,
	FOREIGN KEY ("owner") REFERENCES "users" ("id")
);