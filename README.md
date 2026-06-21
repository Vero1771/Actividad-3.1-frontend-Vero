# VoltTech - Servicios Eléctricos Profesionales

Sitio web estático para una empresa de servicios eléctricos, refrigeración y plomería, con funcionalidad de almacenamiento local mediante IndexedDB.

## Descripción

VoltTech es un sitio web corporativo que presenta los servicios de la empresa, permite a los clientes:

- Solicitar servicios a través de un formulario
- Dejar comentarios y calificaciones
- Visualizar estadísticas de satisfacción
- Ver solicitudes pendientes en tiempo real

Todo el almacenamiento de datos se realiza de forma local mediante IndexedDB, sin necesidad de conexión a internet ni servidores externos.

## Tecnologías utilizadas

- **HTML5** - Estructura del sitio
- **CSS3** - Estilos y diseño responsivo
- **JavaScript (ES6)** - Funcionalidad interactiva
- **IndexedDB** - Almacenamiento local de datos
- **Google Fonts** - Fuentes Inter y Material Symbols

## Estructura del proyecto

```
volttech/
├── index.html          # Página de inicio
├── servicios.html      # Catálogo de servicios
├── testimonios.html    # Opiniones de clientes
├── contacto.html       # Formulario de contacto
├── css/
│   └── style.css       # Estilos globales
└── js/
    └── script.js       # Lógica y gestión de IndexedDB
```

##  Instalación

### Requisitos previos

- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Conexión a internet (para cargar fuentes de Google)

### Pasos de instalación

1. **Clonar o descargar el repositorio**

```bash
git clone https://github.com/tu-usuario/volttech.git
```

2. **Abrir el sitio web**

El sitio funciona completamente desde archivos locales (`file://`). Simplemente abre cualquier archivo HTML en tu navegador:

- Haz doble clic en `index.html`
- O arrastra el archivo a la ventana de tu navegador

3. **Verificar funcionamiento**

- Abre las herramientas de desarrollo (F12)
- Ve a la pestaña "Application" (Chrome) o "Storage" (Firefox)
- Busca "IndexedDB" y verifica que la base de datos `VoltTechDB` se haya creado

## Uso del sitio

### Navegación principal

El sitio cuenta con 4 secciones principales accesibles desde el menú superior:

| Página | Descripción |
|--------|-------------|
| **Inicio** | Presentación de la empresa, valores, servicios destacados |
| **Servicios** | Catálogo detallado de servicios con tabla comparativa |
| **Testimonios** | Opiniones de clientes y formulario para dejar comentarios |
| **Contacto** | Formulario para solicitar servicios y lista de solicitudes |

### Funcionalidades interactivas

#### 1. Dejar un comentario (Testimonios)

1. Ve a la página **Testimonios**
2. Completa todos los campos del formulario
3. Selecciona una calificación haciendo clic en las estrellas
4. Haz clic en **Publicar comentario**
5. El comentario aparecerá en la lista de comentarios y las estadísticas se actualizarán

#### 2. Solicitar un servicio (Contacto)

1. Ve a la página **Contacto**
2. Completa el formulario de solicitud
3. Selecciona el tipo de servicio
4. Haz clic en **Enviar solicitud**
5. La solicitud aparecerá en la lista de solicitudes pendientes

### Datos de ejemplo

El sitio incluye datos de ejemplo precargados:

- **5 comentarios** con diferentes calificaciones
- **5 solicitudes** de servicios variados

Estos datos se crean automáticamente al abrir el sitio por primera vez.

## 🔧 Personalización

### Cambiar datos de ejemplo

Edita el archivo `js/script.js` y busca las variables `sampleComments` y `sampleRequests` para modificar los datos iniciales.

### Modificar estilos

Todos los estilos se encuentran en `css/style.css`. Las variables principales están en `:root`:

```css
:root {
    --primary: #0f1a4a;
    --secondary: #b22222;
    --accent: #f4c430;
    /* ... */
}
```

## 📊 Estructura de datos

### Comentarios
```javascript
{
    id: number,           // Autoincrementable
    nombre: string,
    apellido: string,
    correo: string,
    calificacion: number, // 1-5
    comentario: string,
    fecha: string         // YYYY-MM-DD
}
```

### Solicitudes
```javascript
{
    id: number,           // Autoincrementable
    tipo: string,
    nombre: string,
    apellido: string,
    direccion: string,
    telefono: string,
    mensaje: string,
    estado: string,       // "pendiente"
    fecha: string         // YYYY-MM-DD
}
```

## Notas adicionales

- **Sin dependencias externas**: No requiere frameworks ni librerías externas
- **Funciona offline**: Los datos se almacenan localmente
- **Sin servidor**: Todo el procesamiento es en el lado del cliente
- **Persistencia**: Los datos permanecen incluso después de cerrar el navegador

## Licencia

Este proyecto es de uso educativo. Puedes utilizarlo y modificarlo libremente.

---

*VoltTech - Soluciones eléctricas profesionales* ⚡
