
export const addContactData = (contact) => {
    setStorage('contactList', contact);
};

export const getStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
};

export const setStorage = (key, value) => {
    const storageData = getStorage(key);
    if (storageData === null){
        storageData = [value];
    } else{
        storageData.push(value);
    }
    localStorage.setItem(key, JSON.stringify(storageData));
}

export const removeStorage = (number) => {
    let data = getStorage("contactList");
    data = data.filter(contact => contact.phone !== number);
    localStorage.setItem("contactList", JSON.stringify(data));
}