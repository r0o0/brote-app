const Guests = {
  guests(_, args, { db }) {
    return db.query.guests();
  }
};

export default Guests;