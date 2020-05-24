# Migration `20200524003414-add-github-to-user-provider`

This migration has been generated at 5/24/2020, 12:34:14 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TYPE "AccountProvider" ADD VALUE 'GITHUB'

ALTER TABLE "accounts"."User" ALTER COLUMN "provider" SET DEFAULT 'NONE',
ALTER COLUMN "role" SET DEFAULT 'USER';
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200521145249-init..20200524003414-add-github-to-user-provider
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
@@ -26,6 +26,7 @@
 }
 enum AccountProvider {
   GOOGLE
+  GITHUB
   NONE
 }
```
