#!/bin/bash
set -e

psql -d $POSTGRES_DB -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
EOSQL