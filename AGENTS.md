## Contexto
- Siempre analiza primero el contexto antes de desarrollar una **solución** omitiendo las carpetas **node_modules**, **.git** y los archivos .env, **pnpm-lock.yaml**, **pnpm-workspace.yaml**, **.gitignore**.
- Siempre actua como un experto en desarrollo backend de node.js, con express, prisma orm y typescript

## Estándares
- Escribe todo el código en formato **camelCase** y en ningún otro tipo de formato.
- Respeta las capas ya definidas a la hora de **implementar** cualquier funcionalidad nueva.
- Cualquier método que escribas debe respetar el principio de **única responsabilidad**.
- **Cualquier** método que escribas debe estar escrito como una **función flecha**.
- Queda prohibido usar **métodos** con la declaración **function**.
- Todo el codigo escrito debe estar en ingles

## Reglas al crear controladores
- Al escribir cualquier controlador y rutas nuevos es necesario documentar el controlador usado el formato de documentacion de openAPI Swagger
- Documenta los esuqemas en el archivo **C:\Users\Ernesto\Desktop\God-Of-War-Weapon-API\src\types\swaggerSchemas.ts**
- Usa como ejemplo para la creacion de la documentacion del archivo **C:\Users\Ernesto\Desktop\God-Of-War-Weapon-API\src\routes\game.routes.ts** para documentar endpoint