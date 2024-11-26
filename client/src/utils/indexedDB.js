export const initializeDatabase = async (key, data) => {
  try {
    const db = await openDatabase();

    const existingData = await getObjectFromStore(db, "LinguPinguStore", key);
    if (existingData) {
      await updateObjectInStore(db, "LinguPinguStore", existingData);
    } else {
      await addObjectToStore(db, "LinguPinguStore", { id: key, data });
    }
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

export const fetchDatabaseData = async (key) => {
  try {
    const db = await openDatabase();
    const data = await getObjectFromStore(db, "LinguPinguStore", key);
    return data ? data.data : null;
  } catch (error) {
    console.error("Error fetching data from database:", error);
  }
};


// Open indexedDB
export const openDatabase = () => {
  return new Promise((resolve, reject) => {
    
    const dbName = "clientLinguPinguDB";
    const request = window.indexedDB.open(dbName, 1);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if(!db.objectStoreNames.contains('LinguPinguStore'))
      {
      db.createObjectStore('LinguPinguStore', { keyPath: 'id' });
      }
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      resolve(db);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};
// Update Object in indexedDB
export const updateObjectInStore = async (db, storeName, updatedObject) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.put(updatedObject);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};
// Add Object to indexedDB
export const addObjectToStore = async (db, storeName, data) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.add(data);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

export const getObjectFromStore = async (db, storeName, objectId) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.get(objectId);

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

export const getAllObjectsFromStore = async (db, storeName) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.getAll();

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

export const deleteObjectFromStore = async (db, storeName, objectId) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.delete(objectId);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};