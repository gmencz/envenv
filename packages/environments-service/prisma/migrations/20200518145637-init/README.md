# Migration `20200518145637-init`

This migration has been generated at 5/18/2020, 2:56:37 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "EnvironmentRole" AS ENUM ('ADMIN', 'CONTRIBUTOR');

CREATE TABLE "environments"."EnvironmentMember" (
"environmentId" text   ,"environmentRole" "EnvironmentRole" NOT NULL DEFAULT 'CONTRIBUTOR',"id" text  NOT NULL ,"userId" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "environments"."Environment" (
"id" text  NOT NULL ,"name" text  NOT NULL ,"ownerUserId" text  NOT NULL ,
    PRIMARY KEY ("id"))

ALTER TABLE "environments"."EnvironmentMember" ADD FOREIGN KEY ("environmentId")REFERENCES "environments"."Environment"("id") ON DELETE SET NULL  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200518145637-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,29 @@
+datasource db {
+  provider = "postgresql"
+  url      = env("DATABASE_URL")
+}
+
+generator client {
+  provider      = "prisma-client-js"
+  binaryTargets = ["debian-openssl-1.1.x"]
+}
+
+model EnvironmentMember {
+  id              String          @default(uuid()) @id
+  environment     Environment?    @relation(fields: [environmentId], references: [id])
+  environmentId   String?
+  environmentRole EnvironmentRole @default(CONTRIBUTOR)
+  userId          String
+}
+
+model Environment {
+  id          String              @default(uuid()) @id
+  name        String
+  members     EnvironmentMember[]
+  ownerUserId String
+}
+
+enum EnvironmentRole {
+  ADMIN
+  CONTRIBUTOR
+}
```
