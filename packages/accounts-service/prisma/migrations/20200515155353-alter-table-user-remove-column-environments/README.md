# Migration `20200515155353-alter-table-user-remove-column-environments`

This migration has been generated at 5/15/2020, 3:53:53 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "accounts"."User" DROP COLUMN "environments",
ALTER COLUMN "provider" SET DEFAULT 'NONE',
ALTER COLUMN "role" SET DEFAULT 'USER';
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200515020048-alter-column-picture-to-nullable..20200515155353-alter-table-user-remove-column-environments
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 generator client {
   provider = "prisma-client-js"
@@ -16,9 +16,8 @@
   name               String
   password           String
   role               Role      @default(USER)
   lastPasswordChange DateTime?
-  environments       Int[]
 }
 enum Role {
   USER
```
