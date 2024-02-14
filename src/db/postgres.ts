import pgPromise from 'pg-promise';

const pgp = pgPromise();
const db = pgp(
  'postgresql://danilocha1:G9mHj0YTshnX@ep-bold-pine-a5tlhno0-pooler.us-east-2.aws.neon.tech/medicina?sslmode=require',
);

export default db;
