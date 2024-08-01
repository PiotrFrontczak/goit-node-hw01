import fs from "node:fs/promises";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const args = yargs(hideBin(process.argv)).argv;

// fs.readFile("./data/products.csv")
//   .then((buffer) => {
//     console.log(buffer.toString());
//   })
//   .catch((err) => {
//     console.error(err);
//   });

const buffer = await fs.readFile("./data/products.csv");
const contents = buffer.toString();

const rows = contents.split("\n");

const keys = [];

for (let i = 0; i < rows.length; i++) {
  // Uzyskaj pojedynczy rząd
  const row = rows[i];
  if (i === 0) {
    // Jeśli rząd jest pierwszy, użyj go do stworzenia tablicy kluczy
    keys.push(...row.split(","));
  } else {
    // Podziel wartości z rzędu wg przecinków
    // nieznajdujących się wewnątrz cudzysłowu
    const cols = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

    if (args.id && Number(cols[0]) !== args.id) {
      // Jeżeli komenda zawiera parametr ID,
      // a produkt nie ma tego ID, pomiń iterację
      continue;
    }

    for (let j = 0; j < cols.length; j++) {
      // Dla każdej kolumny wyświetl klucz
      // z indeksem równym indeksowi kolumny
      // i po dwukropku wartość kolumny
      console.log(`${keys[j]}: ${cols[j]}`);
    }
    // Zrób pustą linijkę dla następnego produktu
    console.log("");
  }
}
