const storage = {};

// Session Storage
storage.getSessionItem = (key) => {
  return sessionStorage.getItem(key);
}

storage.setSessionItem = (key, value) => {
  return sessionStorage.setItem(key, value);
}

// Local Storage

storage.getLocalItem = (key) => {
  return localStorage.getItem(key);
}

storage.setLocalItem = (key, value) => {
  return localStorage.setItem(key, value);
}

export default storage;
