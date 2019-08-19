export const checkForUser = (db, email) => {
  return db.exists.User({ email });
}