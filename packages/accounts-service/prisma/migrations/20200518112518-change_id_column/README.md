# Migration `20200518112518-change_id_column`

This migration has been generated at 5/18/2020, 11:25:18 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "accounts"."User" ALTER COLUMN "provider" SET DEFAULT 'NONE',
ALTER COLUMN "role" SET DEFAULT 'USER';
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200515155353-alter-table-user-remove-column-environments..20200518112518-change_id_column
--- datamodel.dml
+++ datamodel.dml
@@ -1,15 +1,16 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 generator client {
-  provider = "prisma-client-js"
+  provider      = "prisma-client-js"
+  binaryTargets = ["debian-openssl-1.1.x"]
 }
 model User {
-  id                 Int       @default(autoincrement()) @id
+  id                 Int       @default(cuid()) @id
   picture            String?
   provider           Provider  @default(NONE)
   username           String    @unique
   email              String    @unique
```
