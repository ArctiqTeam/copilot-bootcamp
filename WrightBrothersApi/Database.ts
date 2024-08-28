import { Pool } from 'pg';

// Note the following code is for demonstration purposes only, and should not be used in a production environment.

const pool = new Pool({
    user: 'db_user',
    host: 'db.example.com',
    database: 'postgresdb',
    password: 'db_password',
    port: 5432,
});

export default pool;