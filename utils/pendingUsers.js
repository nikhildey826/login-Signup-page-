

let pendingUsers = {}; 


const getPendingUser = (email) => {
  return pendingUsers[email.toLowerCase()];
};


const addPendingUser = (email, userData) => {
  pendingUsers[email.toLowerCase()] = userData;
};


const removePendingUser = (email) => {
  delete pendingUsers[email.toLowerCase()];
};

module.exports = {
  getPendingUser,
  addPendingUser,
  removePendingUser,
};
