# Stony Immo — Mise en ligne gratuite (Supabase + Vercel)

Ce dossier contient le site complet, prêt à être mis en ligne. Il faut compter environ **30 minutes**, sans écrire une ligne de code.

- **Supabase** = la base de données en ligne (comptes, annonces, photos, statistiques de visite). Gratuit.
- **Vercel** = l'hébergement du site, qui lui donne une adresse internet. Gratuit.
- **GitHub** = l'endroit où vous déposez les fichiers pour que Vercel les publie. Gratuit.

> Tant que `config.js` n'est pas rempli, le site fonctionne en **mode démonstration** : annonces d'exemple, données enregistrées seulement sur l'appareil. Dès que vous y mettez vos clés Supabase, il passe en **mode en ligne** : tout le monde voit les mêmes annonces.

---

## Étape 1 — Créer la base Supabase (10 min)

1. Allez sur **https://supabase.com** → **Start your project** → créez un compte (avec GitHub ou un e-mail).
2. Cliquez sur **New project** :
   - **Name** : `stony-immo`
   - **Database Password** : choisissez un mot de passe solide et **notez-le**
   - **Region** : la plus proche proposée (par exemple Europe)
   - Puis **Create new project**, et attendez environ 2 minutes.
3. Dans le menu de gauche, ouvrez **SQL Editor** → **New query**.
4. Ouvrez le fichier `supabase/schema.sql` de ce dossier, copiez **tout** son contenu, collez-le, puis cliquez sur **Run**. Le message « Success » doit s'afficher.
5. Menu **Authentication** → **Sign In / Providers** (ou **Providers**) → **Email** :
   - **désactivez « Confirm email »** puis enregistrez.
   - C'est indispensable : vos utilisateurs s'inscrivent avec leur **numéro de téléphone**, pas avec un e-mail à confirmer.
6. Menu **Project Settings** (roue dentée) → **API** (ou **API Keys** / **Data API**). Notez deux valeurs :
   - **Project URL**, par exemple `https://abcdxyz.supabase.co`
   - la clé **anon public** (ou **publishable**), une longue suite de caractères

> ⚠️ Ne copiez **jamais** la clé `service_role` / `secret` dans le site : elle donne tous les droits.

## Étape 2 — Brancher le site sur votre base (2 min)

Ouvrez `config.js` avec un éditeur de texte (Bloc-notes, par exemple) et remplacez les deux valeurs :

```js
window.STONY_CONFIG = {
  supabaseUrl: 'https://abcdxyz.supabase.co',
  supabaseAnonKey: 'eyJhbGciOi...votre clé anon...',
};
```

Enregistrez le fichier.

## Étape 3 — Déposer les fichiers sur GitHub (5 min)

1. Créez un compte sur **https://github.com**.
2. Cliquez sur **+** (en haut à droite) → **New repository** → nom : `stony-immo` → **Public** ou **Private** → **Create repository**.
3. Sur la page du dépôt, cliquez sur le lien **uploading an existing file**.
4. Glissez **tout le contenu** de ce dossier : `index.html`, `config.js`, `vercel.json`, et les dossiers `vendor` et `supabase`, etc.
5. Cliquez sur **Commit changes**.

## Étape 4 — Publier avec Vercel (5 min)

1. Allez sur **https://vercel.com** → **Sign Up** → **Continue with GitHub**.
2. **Add New…** → **Project** → choisissez le dépôt `stony-immo` → **Import**.
3. **Framework Preset** : laissez **Other**. Ne modifiez rien d'autre → **Deploy**.
4. Environ 30 secondes plus tard, votre site est en ligne, par exemple sur `https://stony-immo.vercel.app` 🎉

Chaque fois que vous modifierez un fichier sur GitHub, Vercel republiera le site automatiquement.

## Étape 5 — Devenir administrateur (2 min)

1. Sur votre site en ligne, cliquez sur **Créer un compte** et inscrivez-vous avec **votre numéro de téléphone**.
2. Dans Supabase → **SQL Editor** → **New query**, collez la commande ci-dessous en mettant votre numéro (indicatif 243 + 9 chiffres, sans le +), puis **Run** :

```sql
update public.profiles set role = 'admin', verified = true
where id = (select id from auth.users where email = '243810000000@membres.stonyimmo.cd');
```

3. Ouvrez l'administration de l'une de ces deux façons :
   - ajoutez `#/stony-gestion` à la fin de l'adresse, par exemple `https://stony-immo.vercel.app/#/stony-gestion` ;
   - ou touchez **5 fois** le **©** en bas de n'importe quelle page.

   Connectez-vous avec votre téléphone et votre mot de passe.
4. Dans **Réglages du site** :
   - changez le code secret `stony-gestion` ;
   - remplissez les informations de la société (RCCM, identification nationale, téléphone, WhatsApp…) ;
   - ajustez le taux dollar / franc congolais.

## Étape 6 — Votre propre nom de domaine (facultatif)

1. Achetez `stonyimmo.cd` (ou un `.com`) chez un registraire.
2. Vercel → votre projet → **Settings** → **Domains** → ajoutez le domaine et suivez les indications DNS.
3. L'image d'aperçu WhatsApp (`apercu-whatsapp.png`) est déjà prévue pour `https://stonyimmo.cd/apercu-whatsapp.png`. Elle fonctionnera automatiquement une fois ce domaine branché.

---

## Ce qui est protégé

Les règles de sécurité sont dans `supabase/schema.sql` et ont été testées :

- **Annonces :** chacun ne peut modifier ou supprimer que ses propres annonces.
- **Comptes :** personne ne peut se donner le rôle admin ni le badge « Vérifié ».
- **Numéros de téléphone :** ils ne sont jamais publics. Ils ne sont donnés qu'au clic sur « Afficher le numéro », et chaque contact est compté.
- **Compteurs :** les vues, les contacts et la mise « À la une » ne peuvent pas être truqués.
- **Pièces d'identité et données privées :** elles ne sont visibles que par leur propriétaire et l'administrateur.
- **Comptes bannis :** ils ne peuvent plus publier.
- **Photos :** chacun ne peut envoyer des photos que dans son propre dossier.
- **Visites :** les statistiques sont réelles (tous appareils confondus) et visibles par l'admin seulement.

## Limites des offres gratuites (à connaître)

- **Supabase Free :**
  - 500 Mo de base de données et 1 Go de photos.
  - Le projet est **mis en pause après 1 semaine sans aucune visite**. Il suffit alors de cliquer sur « Restore » dans le tableau de bord Supabase. Un site visité régulièrement n'est pas concerné.
- **Vercel Hobby :** réservé à un usage **personnel et non commercial**. Pour un lancement test, c'est suffisant. Quand Stony Immo deviendra une activité commerciale (abonnements, publicité…), il faudra passer au plan Pro de Vercel, ou héberger ces mêmes fichiers sur un service dont l'offre gratuite accepte l'usage commercial.
- **Mot de passe oublié :** comme les comptes utilisent le téléphone, la réinitialisation se fait par l'admin, dans Supabase → **Authentication** → **Users** → l'utilisateur → **Send password recovery** ou **Update password**.

## Contenu du dossier

| Fichier | Rôle |
|---|---|
| `index.html` | Le site complet |
| `config.js` | Vos deux clés Supabase (le seul fichier à modifier) |
| `supabase/schema.sql` | La base de données et ses règles de sécurité |
| `vendor/supabase.js` | Bibliothèque officielle Supabase (v2) |
| `vercel.json` | Réglages d'hébergement |
| `apercu-whatsapp.png` | Image affichée quand on partage le lien |
| `logo.jpg`, `icon-*.png`, `favicon.png` | Logo et icônes de l'application |

Licence MIT — © 2026 Eliestone — Stony Immo.
