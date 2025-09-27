<!--
Guidance for AI coding assistants working in this repository.
Keep this short, actionable, and focused on discoverable patterns.
-->

# Copilot instructions for cloud-computing-project

This file contains focused, repo-specific guidance for automated coding agents so they can be productive immediately.

## Big picture (what this repo is)

- Multi-service banking platform (SPA + 5 microservices). See top-level `README.md` for the architecture diagram.
- Each microservice lives in `cloud-computing-project-ms-*`. MS4 is the Go-based Compliance & Risk service (Gin + GORM + MySQL).

## How to run locally (important commands)

- Many services are composed via `docker-compose.yaml` in the repo root. Typical dev start (from repo root):
  - Create env files per-service (for MS4 copy `.env.example` to `.env` in `cloud-computing-project-ms-4`), then:
    - `docker-compose up --build --profile ms4` to run only MS4 and its DB (or without `--profile` to run all profiles configured)
- MS4 quick run in its folder (Go toolchain required):
  - Copy `.env.example` → `.env` and set DB credentials
  - `go run ./internal` or `go build ./... && ./ms4-compliance-service` (module path: `github.com/warleon/ms4-compliance-service`)

## Key files and patterns to reference

- MS4 entrypoint: `cloud-computing-project-ms-4/internal/main.go` — shows config loading, DB init, migrations and Gin route registration.
- DB config: `cloud-computing-project-ms-4/internal/config/config.go` — env variable names (DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, PORT, FRAUD_API_URL).
- Handlers and service boundaries: `internal/handlers/*`, `internal/service/*` — handlers perform JSON binding and delegate to service layer.
- Repository pattern: `internal/repository/mysql_repository.go` and `internal/repository/rules` — GORM models and CRUD methods. Use `Repository` interface when modifying data access.

## Coding conventions & project-specific patterns

- HTTP handlers use Gin and always respond with JSON. They perform simple validation via `ShouldBindJSON` and return 400 on binding errors, 500 on service errors (see `handlers/compliance.go`). Follow same style for new endpoints.
- Services accept `context.Context` from Gin request (`c.Request.Context()`) — preserve context propagation for timeouts/cancellations.
- DB migrations are called via `db.AutoMigrate(...)` on startup. Add new tables to the `rules.RuleTables` slice or `repository.RepositoryTables` where appropriate.
- Environment variables: code uses `getEnv(key, fallback)`; prefer matching the names in `config/config.go` when adding new config.

## Integration points & external deps

- MS4 depends on a MySQL instance (docker service name `mysql` in `docker-compose.yaml`). Healthchecks are configured — tests or start scripts may rely on that.
- MS4 optionally calls an external FRAUD API via `FRAUD_API_URL` — check `internal/service` for exact call sites before mocking.

## Example fixes/tasks an AI can do reliably

- Add a new handler+route: mirror existing pattern in `internal/handlers/compliance.go` and register route in `internal/main.go` under `/api/v1`.
- Add a GORM model/table: create model in `internal/repository/rules`, append it to `rules.RuleTables`, and ensure CRUD methods in `mysql_repository.go` follow existing naming and error handling.
- Update env documentation: update `cloud-computing-project-ms-4/README.md` and `.env.example` when adding new config keys.

## What not to change without human review

- Global architecture or inter-service APIs (MS1..MS5) that are defined in the top-level `README.md` — coordinate before changing public endpoints.
- Migration ordering and destructive DB changes — raise a PR with migration plan.

## When you need more context

- Read `internal/main.go`, `internal/config/config.go`, and `internal/handlers/compliance.go` in the target microservice for service-specific conventions. Use top-level `docker-compose.yaml` to understand service wiring.

If any section is unclear or you'd like me to expand examples for a particular microservice, tell me which service and I'll iterate.
