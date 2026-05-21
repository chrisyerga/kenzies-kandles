# Deployment

Production runs as a Docker container on the shared DigitalOcean droplet. TLS and routing are handled by the edge Caddy stack in [lindale-infra](https://github.com/chrisyerga/lindale-infra).

## Droplet layout

- App files: `/opt/kenzieskandles`
- Container name: `kenzies-web` (must match edge Caddyfile)
- Network: `edge` (external Docker network)

## Droplet setup

1. Bootstrap edge Caddy from `lindale-infra`.
2. Create `/opt/kenzieskandles` with `docker-compose.yml` and `.env` from `infra/docker/production.env.example`.
3. Point `kenzieskandles.com` DNS at the droplet.
4. Deploy via GitHub Actions.

## GitHub Secrets

```txt
DO_HOST
DO_USER
DO_SSH_KEY
```

Runtime secrets (`DATABASE_URL`, `ADMIN_PASSWORD`, `SMTP_*`) live in the droplet `.env` file, not GitHub.

## Migrations

The deploy workflow runs `node scripts/migrate.js` before each deploy. Migrations are idempotent where possible.

Manual migration on the droplet:

```bash
cd /opt/kenzieskandles
docker compose run --rm web node scripts/migrate.js
```

## Local build

```bash
npm run build
docker build -t kenzies-kandles .
docker run --rm -p 4321:4321 --env-file .env kenzies-kandles
```
