# Migration `20200518121831-alter-id-datatype`

This migration has been generated at 5/18/2020, 12:18:31 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
DROP TABLE "accounts"."User";

CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

CREATE TYPE "Provider" AS ENUM ('GOOGLE', 'NONE');

CREATE TABLE "accounts"."User" (
"email" text  NOT NULL ,"id" text  NOT NULL ,"lastPasswordChange" timestamp(3)   ,"name" text  NOT NULL ,"password" text  NOT NULL ,"picture" text   ,"provider" "Provider" NOT NULL DEFAULT 'NONE',"role" "Role" NOT NULL DEFAULT 'USER',"username" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE UNIQUE INDEX "User.username" ON "accounts"."User"("username")

CREATE UNIQUE INDEX "User.email" ON "accounts"."User"("email")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200518112518-change_id_column..20200518121831-alter-id-datatype
--- datamodel.dml
+++ datamodel.dml
@@ -1,16 +1,16 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 generator client {
   provider      = "prisma-client-js"
   binaryTargets = ["debian-openssl-1.1.x"]
 }
 model User {
-  id                 Int       @default(cuid()) @id
+  id                 String    @default(cuid()) @id
   picture            String?
   provider           Provider  @default(NONE)
   username           String    @unique
   email              String    @unique
```
