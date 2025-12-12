# Russell Port API

Application Express + MongoDB pour gérer les catways et réservations.

## Lancer localement

1. Cloner le dépôt
2. Copier `.env.example` en `.env` et adapter `MONGODB_URI`, `JWT_SECRET`.
3. Installer : `npm install`
4. Importer les données de `catways.json` et `reservations.json` ou lancer `npm run seed`.
5. Lancer en dev : `npm run dev`.

L'API sera accessible par défaut sur `http://localhost:3000`.

## Documentation

Swagger UI disponible sur `/api-docs`.

## Compte admin de test

Créez un utilisateur via POST `/users` (ex: admin@example.com / Password123!).

## Déploiement

1. Héberger la base sur MongoDB Atlas et récupérer `MONGODB_URI`.
2. Déployer l'app sur Render / Railway / Heroku :
   - Variables d'environnement : `MONGODB_URI`, `JWT_SECRET`, `COOKIE_NAME`, `NODE_ENV`.
3. Configurer build command `npm install` et start `npm start`.

**Remarques** : pour production, activez HTTPS, cookies sécurisés et politiques CORS si besoin.
