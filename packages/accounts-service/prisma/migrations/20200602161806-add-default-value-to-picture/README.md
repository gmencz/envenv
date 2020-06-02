# Migration `20200602161806-add-default-value-to-picture`

This migration has been generated at 6/2/2020, 4:18:06 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "accounts"."User" DROP COLUMN "email",
ADD COLUMN "email" text  NOT NULL ,
DROP COLUMN "picture",
ADD COLUMN "picture" text  NOT NULL DEFAULT E'https://envenvbucket.s3.eu-west-3.amazonaws.com/defaults/default-profile-picture.png',
ALTER COLUMN "provider" SET DEFAULT E'NONE',
ALTER COLUMN "role" SET DEFAULT E'USER';
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200524024323-remove-google-from-providers..20200602161806-add-default-value-to-picture
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
@@ -9,12 +9,12 @@
 }
 model User {
   id                 String          @default(cuid()) @id
-  picture            String?
+  picture            String          @default("https://envenvbucket.s3.eu-west-3.amazonaws.com/defaults/default-profile-picture.png")
   provider           AccountProvider @default(NONE)
   username           String          @unique
-  email              String?         @unique
+  email              String          @unique
   name               String
   password           String
   role               UserRole        @default(USER)
   lastPasswordChange DateTime?
@@ -27,5 +27,5 @@
 enum AccountProvider {
   GITHUB
   NONE
-}
+}
```
