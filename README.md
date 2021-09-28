# BLOKODING

La plateforme qui permet aux enfants de s'initier à l'informatique de façon ludique !

## Documentation développeur

Pour savoir qui travaille :
git ls-files | while read f; do git blame --line-porcelain $f | grep '^author '; done | sort -f | uniq -ic | sort -n

### Lancement du projet (iOS et Android)

#### NodeJS

Assurez-vous d'avoir une version de NodeJS >= 12.0 d'installé sur votre machine.
Pour cela ouvrez le terminal et entrez:

```shell
node -v
```

Si vous n'avez pas NodeJS d'installé alors installez le via ce lien: https://nodejs.org/en/download/

#### Yarn

Assurez-vous d'avoir yarn installé:

```shell
yarn --version
```

Si ce n'est pas le cas tapez dans le terminal (installation de yarn en global sur la machine):

```shell
npm install --global yarn
```

#### Installer le projet

Pour installer le projet procédez comme suit:

```shell
git clone https://github.com/remydao/blokoding.git
cd blokoding
yarn install
```

#### Lancement android

Pour lancer le projet sur Android faites:

```shell
yarn android
```

#### Lancement iOS

Pour lancer le projet sur iOS faites:

```shell
cd ios/
pod install && cd ../
yarn ios
```

## Architecture projet

Voici l'architecture générale du projet:

```shell
.
├── App.js                      # Composant initial
├── __tests__                   # Dossier de test
├── android                     # Dossier spécifique android
├── assets                      # Assets (polices d'écritures)
├── babel.config.js             # Configuration babel
├── index.js                    # Point d'entrée du programme
├── ios                         # Dossier spécifique iOS
├── jest.config.js              # Config jest (testsuite)
├── metro.config.js             # Config metro
├── node_modules                # Modules node (dépendances)
├── package-lock.json           # Modules installés
├── package.json                # Liste des dépendances
├── react-native.config.js      # Config react-native
├── src                         # Code source
└── tsconfig.json               # Config Typescript
```

## Architecture code source

Voici l'architecture du code source:

```shell
src/
├── AppPermission.ts            # Config permission (caméra...)
├── assets                      # Assets (graphiques, sons...)
│   ├── MapItems
│   ├── backgrounds
│   ├── characters
│   ├── environments
│   └── items
├── components                  # Composants
│   ├── BackgroundGame.tsx      # Composant représentant le background de l'écran de jeu
│   ├── Card.tsx
│   ├── Character.tsx           # Composant représentant le personnage
│   ├── CustomHeader.tsx
│   ├── FlatButton.tsx
│   ├── Inventory.tsx           # Composant correspondant à l'inventaire
│   ├── LevelButton.tsx
│   ├── MapItem.tsx             # Composant représentant un item situé sur la carte
│   ├── Overlay.tsx
│   └── TextAnimator.tsx
├── constants                   # Constantes (maps, level details...)
├── screens                     # Ecran de l'application
│   ├── CameraScreen.tsx        # Ecran de prise de photo (découpage OCR)
│   ├── DiscoverScreen.tsx      # Ecran de sélection des niveaux tutoriels
│   ├── EnigmaScreen.tsx        # Ecran de sélection des niveaux d'énigmes
│   ├── GameScreen.tsx          # Ecran de jeu
│   ├── HelpScreen.tsx          # Ecran d'aide
│   ├── HomeScreen.tsx          # Ecran d'accueil
│   ├── LevelScreen.tsx         # Ecran de présentation d'un niveau (énoncé du niveau)
│   ├── OptionsScreen.tsx       # Ecran de sélection des options
│   └── Screens.ts
└── scripts                     # Scripts
    ├── blocks                  # Classes des blocs de code
    └── parsing                 # Parsing du tableau renvoyé par l'OCR
```

## Auteurs

Remy Dao - Xavier Facqueur - David Ghiassi - Alexandre Vermeulen
