# EI

Site de recommandation de films pour l'EI de CentraleSupélec avec Théodo

# Centrale-EI-Theodo

The website is hosted on a VM at ViaRézo on the ip 138.195.138.190

## Backend

### Project setup

```
cd backend
npm install
cp .env.example .env
npm run migration:generate --name=MonNomDeMigration
npm run migration:run
```

### Start and auto-reload for development

```
npm run dev
```

### Start for production

```
npm run start
```

### Lint and fix files

```
npm run lint
```

## Frontend

### Project setup

```
cd frontend
npm install
```

### Compile and hot-reload for development

```
npm run dev
```

### Compile and minifiy for production

```
npm run build
```

### Lint and fix files

```
npm run lint
```

### Deployment

Run

```
cd frontend
npm run build
```

Merge in main, ssh to 168.195.168.190 and do

```
cd /var/www
./deploy
```

The site will restart, go on [this link](http://138.195.138.190/api/tmdb) to run the script that fills the database
