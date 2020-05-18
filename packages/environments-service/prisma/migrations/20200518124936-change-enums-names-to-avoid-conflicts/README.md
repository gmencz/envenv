# Migration `20200518124936-change-enums-names-to-avoid-conflicts`

This migration has been generated at 5/18/2020, 12:49:36 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
DROP TABLE "environments"."Environment";

DROP TABLE "environments"."EnvironmentMember";

CREATE TYPE "EnvironmentRole" AS ENUM ('ADMIN', 'CONTRIBUTOR');

CREATE TABLE "environments"."Environment" (
"id" text  NOT NULL ,"name" text  NOT NULL ,"ownerUserId" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "environments"."EnvironmentMember" (
"environmentId" text   ,"environmentRole" "EnvironmentRole" NOT NULL DEFAULT 'CONTRIBUTOR',"id" text  NOT NULL ,"userId" text  NOT NULL ,
    PRIMARY KEY ("id"))

ALTER TABLE "environments"."EnvironmentMember" ADD FOREIGN KEY ("environmentId")REFERENCES "environments"."Environment"("id") ON DELETE SET NULL  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200518124537-change-datatype-for-id-s..20200518124936-change-enums-names-to-avoid-conflicts
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 generator client {
   provider      = "prisma-client-js"
@@ -15,15 +15,15 @@
   ownerUserId String
 }
 model EnvironmentMember {
-  id              String       @default(cuid()) @id
-  environment     Environment? @relation(fields: [environmentId], references: [id])
+  id              String          @default(cuid()) @id
+  environment     Environment?    @relation(fields: [environmentId], references: [id])
   environmentId   String?
-  environmentRole Role         @default(CONTRIBUTOR)
+  environmentRole EnvironmentRole @default(CONTRIBUTOR)
   userId          String
 }
-enum Role {
+enum EnvironmentRole {
   ADMIN
   CONTRIBUTOR
 }
```
