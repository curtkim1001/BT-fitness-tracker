const getDatabaseUrl = (nodeEnv) => {
  return (
    {
      development: "postgres://postgres:postgres@localhost:5432/breakable-toy-fitness-tracker_development",
      test: "postgres://postgres:postgres@localhost:5432/breakable-toy-fitness-tracker_test",
      e2e: "postgres://postgres:postgres@localhost:5432/breakable-toy-fitness-tracker_e2e",
    }[nodeEnv] || process.env.DATABASE_URL
  );
};

module.exports = getDatabaseUrl;
