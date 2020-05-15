# Migration `20200515012953-alter-lastpasswordchange-column-to-optional-date`

This migration has been generated at 5/15/2020, 1:29:53 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "accounts"."User" ALTER COLUMN "lastPasswordChange" DROP NOT NULL,
ALTER COLUMN "provider" SET DEFAULT 'NONE',
ALTER COLUMN "role" SET DEFAULT 'USER';
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200514221003-add-column-to-identify-external-environment..20200515012953-alter-lastpasswordchange-column-to-optional-date
--- datamodel.dml
+++ datamodel.dml
@@ -1,23 +1,23 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 generator client {
   provider = "prisma-client-js"
 }
 model User {
-  id                 Int      @default(autoincrement()) @id
+  id                 Int       @default(autoincrement()) @id
   picture            String
-  provider           Provider @default(NONE)
-  username           String   @unique
-  email              String   @unique
+  provider           Provider  @default(NONE)
+  username           String    @unique
+  email              String    @unique
   name               String
   password           String
-  role               Role     @default(USER)
-  lastPasswordChange DateTime
+  role               Role      @default(USER)
+  lastPasswordChange DateTime?
   environments       Int[]
 }
 enum Role {
```
