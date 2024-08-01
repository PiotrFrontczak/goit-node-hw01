const fs = require("node:fs").promises;
const { nanoid } = require("nanoid");
const path = require("node:path");

/*
 * Skomentuj i zapisz wartość
 * const contactsPath = ;
 */

const contactsPath = "./db/contacts.json";

function listContacts() {
  // Odnajdź plik wg ścieżki
  const file = fs.readFile(path.resolve(contactsPath));
  // Odczytaj plik
  file.then((content) => {
    // Przekonwertuj zawartość pliku na ciąg znaków
    const fileStr = content.toString();
    // Przekonwertuj ciąg znaków na JSON i wrzuć go do tabeli (console.table)
    console.table(JSON.parse(fileStr));
  });
}

function getContactById(contactId) {
  // Odnajdź plik wg ścieżki
  const file = fs.readFile(path.resolve(contactsPath));
  // Odczytaj plik
  file.then((content) => {
    // Przekonwertuj zawartość pliku na ciąg znaków
    const fileStr = content.toString();
    // Przekonwertuj ciąg znaków na JSON
    const result = JSON.parse(fileStr);
    // Przefiltruj JSON w poszukiwaniu pożądanego kontaktu
    console.log(result.find((contact) => contact.id === contactId));
  });
}

function removeContact(contactId) {
  // Odnajdź plik wg ścieżki
  const file = fs.readFile(path.resolve(contactsPath));
  // Odczytaj plik
  file.then((content) => {
    // Przekonwertuj zawartość pliku na ciąg znaków
    const fileStr = content.toString();
    // Przekonwertuj ciąg znaków na JSON
    const result = JSON.parse(fileStr);
    // Przefiltruj JSON w poszukiwaniu pożądanego kontaktu
    const afterDelete = result.filter((contact) => contact.id !== contactId);
    // Zapisz nowe dane do pliku
    fs.writeFile(path.resolve(contactsPath), JSON.stringify(afterDelete)).then(() => {
        console.log("Zapis do pliku zakończony powodzeniem.".green);
    });
  });
}

function addContact(name, email, phone) {
  // Odnajdź plik wg ścieżki
  const file = fs.readFile(path.resolve(contactsPath));
  // Odczytaj plik
  file.then((content) => {
    // Przekonwertuj zawartość pliku na ciąg znaków
    const fileStr = content.toString();
    // Przekonwertuj ciąg znaków na JSON
    const result = JSON.parse(fileStr);
    // Dodaj element do odkodowanej tablicy
    result.push({
        id: nanoid(21),
        name,
        email,
        phone,
    });
    // Zapisz nowe dane do pliku
    fs.writeFile(path.resolve(contactsPath), JSON.stringify(result)).then(() => {
        console.log("Zapis do pliku zakończony powodzeniem.".green);
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
