# Los Shakas

App de Los Shakas en **React Native (Expo) + NativeWind (Tailwind CSS 3.4)**.

## Estructura

- `App.tsx` – raíz; carga la fuente MedievalSharp y muestra el login.
- `src/screens/LoginScreen.tsx` – pantalla de inicio de sesión (clases Tailwind).
- `assets/svg/` – `logo_shakas.svg` (logo) y `background.svg`.
- `assets/images/background.jpg` – foto de fondo.
- `assets/fonts/MedievalSharp.ttf` – tipografía del título.
- `tailwind.config.js` – colores de marca (`shaka-*`) y `font-medieval`.

## Comandos

```bash
npm run web       # navegador
npm run android   # Android
npm run ios       # iOS (requiere macOS) o usa Expo Go
npm start         # menú de Expo
```

Los SVG se importan como componentes: `import Logo from './assets/svg/logo_shakas.svg'`.
