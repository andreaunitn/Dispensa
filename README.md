# Dispensa
La Dispensa - un’app che ogni giorno seleziona le ricette migliori per il tuo pranzo e per la tua cena

## HOW TO DEMO LOCALE

### Installare le dipendenze

* Per installare le dipendenze, nella root del progetto eseguire:
```
npm install
```
* Prima di eseguire, nella root del progetto creare un file .env come segue:
```
# .env.example

# This is an example file for running the app locally.

# Passphrase used to generate jwt token 
SUPER_SECRET='your-secret-key'

# Url to the MongoDb database
DB_URL='your-db-url-with-user-and-password'

# Server port
PORT='server-port'

```

### Eseguire il progetto

* Per testare le API del progetto con un unico comando:
```
npm test
```

* Per compilare ed eseguire il server nodejs in locale:
```
npm run start_local
```

* Per compilare ed eseguire il server nodejs in modalità dev con un unico comando:
```
npm run dev
```
* Il server verrà eseguito in locale sulla porta 3000 (localhost:3000)

***

### Per maggiori informazioni sul progetto, si veda la [Wiki](https://github.com/andreaunitn/Dispensa/wiki)
