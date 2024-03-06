
POSTGRES_USER=user_management_user
POSTGRES_DB=mydatabase
SQL_SCRIPT="init.sql"

psql -h localhost -U "$POSTGRES_USER" -d "$POSTGRES_DB" -a -f "$SQL_SCRIPT"
