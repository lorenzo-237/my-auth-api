# Example .env

DATABASE_URL="postgresql://postgres:admin@localhost:5432/auth-db?schema=public"
CIPHER_KEY="super-key"
SESSION_SALT="super-salt"

# Test

git remote add origin https://github.com/lorenzo-237/my-auth-api.git
git branch -M main
git push -u origin main
