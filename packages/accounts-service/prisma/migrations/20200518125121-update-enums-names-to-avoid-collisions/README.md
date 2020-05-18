# Migration `20200518125121-update-enums-names-to-avoid-collisions`

This migration has been generated at 5/18/2020, 12:51:21 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

CREATE TYPE "AccountProvider" AS ENUM ('GOOGLE', 'NONE');

CREATE TABLE "accounts"."User" (
"email" text  NOT NULL ,"id" text  NOT NULL ,"lastPasswordChange" timestamp(3)   ,"name" text  NOT NULL ,"password" text  NOT NULL ,"picture" text   ,"provider" "AccountProvider" NOT NULL DEFAULT 'NONE',"role" "UserRole" NOT NULL DEFAULT 'USER',"username" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE UNIQUE INDEX "User.username" ON "accounts"."User"("username")

CREATE UNIQUE INDEX "User.email" ON "accounts"."User"("email")

DROP TYPE "Provider"

DROP TYPE "Role"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200518121831-alter-id-datatype..20200518125121-update-enums-names-to-avoid-collisions
--- datamodel.dml
+++ datamodel.dml
@@ -1,31 +1,31 @@
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
-  id                 String    @default(cuid()) @id
+  id                 String          @default(cuid()) @id
   picture            String?
-  provider           Provider  @default(NONE)
-  username           String    @unique
-  email              String    @unique
+  provider           AccountProvider @default(NONE)
+  username           String          @unique
+  email              String          @unique
   name               String
   password           String
-  role               Role      @default(USER)
+  role               UserRole        @default(USER)
   lastPasswordChange DateTime?
 }
-enum Role {
+enum UserRole {
   USER
   ADMIN
 }
-enum Provider {
+enum AccountProvider {
   GOOGLE
   NONE
 }
```
