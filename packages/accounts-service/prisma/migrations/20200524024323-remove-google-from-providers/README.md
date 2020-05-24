# Migration `20200524024323-remove-google-from-providers`

This migration has been generated at 5/24/2020, 2:43:23 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "AccountProvider_new" AS ENUM ('GITHUB', 'NONE');
ALTER TABLE "accounts"."User" ALTER COLUMN "provider" DROP DEFAULT,
                        ALTER COLUMN "provider" TYPE "AccountProvider_new" USING ("provider"::text::"AccountProvider_new"),
                        ALTER COLUMN "provider" SET DEFAULT 'GITHUB';
ALTER TYPE "AccountProvider" RENAME TO "AccountProvider_old";
ALTER TYPE "AccountProvider_new" RENAME TO "AccountProvider";
DROP TYPE "AccountProvider_old"

ALTER TABLE "accounts"."User" ALTER COLUMN "provider" SET DEFAULT 'NONE',
ALTER COLUMN "role" SET DEFAULT 'USER';
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200524014409-make-email-optional..20200524024323-remove-google-from-providers
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
@@ -25,8 +25,7 @@
   ADMIN
 }
 enum AccountProvider {
-  GOOGLE
   GITHUB
   NONE
 }
```
