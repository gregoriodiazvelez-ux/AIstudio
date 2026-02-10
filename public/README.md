# Carpeta Pública (public)

Esta es la carpeta donde debes subir tus imágenes estáticas para que sean accesibles en tu sitio web, tanto en desarrollo local como en producción (Vercel).

## Instrucciones para tus imágenes

1.  **Plano del Mapa:**
    Sube tu imagen del plano aquí y nómbrala `plano-topografico.jpg`.
    *   Si tu archivo es PNG, nómbralo `plano-topografico.png`.
    *   El código en `pages/Parcels.tsx` buscará primero el .jpg y luego el .png automáticamente.

2.  **Otras Imágenes:**
    Puedes subir aquí fotos de los lotes, logos, etc.

## Cómo usar estas imágenes en el código

Cualquier archivo que pongas aquí se sirve desde la raíz `/`.

Ejemplo:
Si subes `public/mi-foto.jpg`:

```tsx
// En tu componente React:
<img src="/mi-foto.jpg" alt="Descripción" />
```

No necesitas importar la imagen con `import ... from ...`, simplemente usa la ruta como una cadena de texto comenzando con `/`.
