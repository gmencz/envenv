# Migration `20200518124537-change-datatype-for-id-s`

This migration has been generated at 5/18/2020, 12:45:37 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "Role" AS ENUM ('ADMIN', 'CONTRIBUTOR');

CREATE TABLE "environments"."Environment" (
"id" text  NOT NULL ,"name" text  NOT NULL ,"ownerUserId" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "environments"."EnvironmentMember" (
"environmentId" text   ,"environmentRole" "Role" NOT NULL DEFAULT 'CONTRIBUTOR',"id" text  NOT NULL ,"userId" text  NOT NULL ,
    PRIMARY KEY ("id"))

ALTER TABLE "environments"."EnvironmentMember" ADD FOREIGN KEY ("environmentId")REFERENCES "environments"."Environment"("id") ON DELETE SET NULL  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200514220321-add-column-to-identify-external-user-environment-member..20200518124537-change-datatype-for-id-s
--- datamodel.dml
+++ datamodel.dml
@@ -1,26 +1,27 @@
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
 model Environment {
-  id          Int                 @default(autoincrement()) @id
+  id          String              @default(cuid()) @id
   name        String
   members     EnvironmentMember[]
-  ownerUserId Int
+  ownerUserId String
 }
 model EnvironmentMember {
-  id              Int          @default(autoincrement()) @id
+  id              String       @default(cuid()) @id
   environment     Environment? @relation(fields: [environmentId], references: [id])
-  environmentId   Int?
+  environmentId   String?
   environmentRole Role         @default(CONTRIBUTOR)
-  userId          Int
+  userId          String
 }
 enum Role {
   ADMIN
```
