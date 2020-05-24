# Migration `20200524014409-make-email-optional`

This migration has been generated at 5/24/2020, 1:44:09 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "accounts"."User" ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "provider" SET DEFAULT 'NONE',
ALTER COLUMN "role" SET DEFAULT 'USER';
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200524003414-add-github-to-user-provider..20200524014409-make-email-optional
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
@@ -12,9 +12,9 @@
   id                 String          @default(cuid()) @id
   picture            String?
   provider           AccountProvider @default(NONE)
   username           String          @unique
-  email              String          @unique
+  email              String?         @unique
   name               String
   password           String
   role               UserRole        @default(USER)
   lastPasswordChange DateTime?
```
