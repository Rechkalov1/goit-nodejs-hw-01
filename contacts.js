const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");
const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const normId = String(contactId);
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === normId);

  return result || null;
};

const removeContact = async (contactId) => {
  const normId = String(contactId);
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === normId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContacts = {
    id: v4(),
    name,
    email,
    phone,
  };
  contacts.push(newContacts);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContacts;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
