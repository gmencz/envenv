# Migration `20200602221701-change-default-profile-picture`

This migration has been generated at 6/2/2020, 10:17:01 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "accounts"."User" ALTER COLUMN "picture" SET DEFAULT E'http://avatars3.envenv.es/default-profile-picture.png',
ALTER COLUMN "provider" SET DEFAULT E'NONE',
ALTER COLUMN "role" SET DEFAULT E'USER';
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200602162120-make-picture-optional..20200602221701-change-default-profile-picture
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("POSTGRES_DB_URI")
 }
 generator client {
   provider      = "prisma-client-js"
@@ -9,9 +9,9 @@
 }
 model User {
   id                 String          @default(cuid()) @id
-  picture            String?         @default("https://envenvbucket.s3.eu-west-3.amazonaws.com/defaults/default-profile-picture.png")
+  picture            String?         @default("http://avatars3.envenv.es/default-profile-picture.png")
   provider           AccountProvider @default(NONE)
   username           String          @unique
   email              String          @unique
   name               String
```
