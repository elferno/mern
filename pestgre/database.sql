CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"login" VARCHAR(50),
	"pass" VARCHAR(50),
	"links" VARCHAR[]
);