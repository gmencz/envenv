# Migration `20200515020048-alter-column-picture-to-nullable`

This migration has been generated at 5/15/2020, 2:00:48 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "accounts"."User" ALTER COLUMN "picture" DROP NOT NULL,
ALTER COLUMN "provider" SET DEFAULT 'NONE',
ALTER COLUMN "role" SET DEFAULT 'USER';
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200515012953-alter-lastpasswordchange-column-to-optional-date..20200515020048-alter-column-picture-to-nullable
--- datamodel.dml
+++ datamodel.dml
@@ -1,16 +1,16 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 generator client {
   provider = "prisma-client-js"
 }
 model User {
   id                 Int       @default(autoincrement()) @id
-  picture            String
+  picture            String?
   provider           Provider  @default(NONE)
   username           String    @unique
   email              String    @unique
   name               String
```
