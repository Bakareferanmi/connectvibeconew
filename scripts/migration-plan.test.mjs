import assert from "node:assert/strict";
import { test } from "node:test";
import { isMigrationFile, migrationName, pendingMigrations } from "./migration-plan.mjs";

test("migrations are keyed on their file name, not their path", () => {
  assert.equal(migrationName("/migrations/0002_orders.sql"), "0002_orders.sql");
  assert.equal(migrationName("0001_content.sql"), "0001_content.sql");
});

test("a migration that was already applied does not run again", () => {
  assert.deepEqual(pendingMigrations(["/migrations/0001_content.sql"], ["0001_content.sql"]), []);
});

test("pending migrations come back in name order", () => {
  assert.deepEqual(
    pendingMigrations(
      ["/migrations/0003_c.sql", "/migrations/0001_a.sql", "/migrations/0002_b.sql"],
      ["0001_a.sql"],
    ),
    [
      { name: "0002_b.sql", path: "/migrations/0002_b.sql" },
      { name: "0003_c.sql", path: "/migrations/0003_c.sql" },
    ],
  );
});

test("only .sql files count as migrations", () => {
  assert.equal(isMigrationFile("0001_content.sql"), true);
  assert.equal(isMigrationFile("README.md"), false);
  assert.deepEqual(pendingMigrations(["README.md", "notes"], []), []);
});
