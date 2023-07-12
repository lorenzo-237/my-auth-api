# Example .env

```bash
DATABASE_URL="postgresql://postgres:admin@localhost:5432/auth-db?schema=public"
CIPHER_KEY="super-key"
SESSION_SALT="super-salt"
APP_PORT="3000"
REDIS_HOST="127.0.0.1"
REDIS_PORT="6379"
REDIS_PREFIX="myapp"
```

# Test

```bash
git remote add origin https://github.com/lorenzo-237/my-auth-api.git
git branch -M main
git push -u origin main
```

# Prisma 

[Prisma & NestJs](https://www.prisma.io/blog/nestjs-prisma-rest-api-7D056s1BmOL0)