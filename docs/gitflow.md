# Sistema de Control de Flotas

## Flujo de trabajo con GitFlow

Este proyecto utiliza GitFlow para organizar el desarrollo en Git.

## Ramas principales
- main: contiene el código en producción
- develop: rama base donde se integran todas las funcionalidades

## Forma de trabajo del equipo

Todos los integrantes deben trabajar a partir de la rama develop.

Pasos:

1. Clonar el repositorio:
   git clone URL_DEL_REPOSITORIO

2. Ingresar al proyecto:
   cd nombre-del-proyecto

3. Cambiar a la rama develop:
   git checkout ramadesarollo

4. Crear una rama para su funcionalidad:
   git checkout -b feature/nombre-funcionalidad

## Desarrollo de funcionalidades (feature)

Cada nueva funcionalidad se desarrolla en una rama feature.

Ejemplo:
git checkout -b feature/seguimiento-gps  

Luego:
git add .  
git commit -m "feat: agregar seguimiento gps"  
git push -u origin feature/seguimiento-gps  

## Integración a ramadesarollo

Una vez terminada la funcionalidad, se debe integrar a la rama develop.

### Opción recomendada: Pull Request

Pasos en GitHub:

1. Ir al repositorio
2. Ir a la pestaña "Pull requests"
3. Hacer clic en "New pull request"
4. Seleccionar:
   - Base: ramadesarollo
   - Compare: feature/nombre-funcionalidad
5. Hacer clic en "Create pull request"
6. Agregar título y descripción
7. Revisar los cambios
8. Hacer clic en "Merge pull request"

### Opción manual

git checkout ramadesarollo  
git merge feature/seguimiento-gps  
git push  

## Buenas prácticas en Pull Request

- El código debe compilar correctamente
- Incluir una descripción clara de los cambios
- No incluir archivos innecesarios
- Mantener la rama actualizada antes del merge:

git checkout feature/nombre-funcionalidad  
git pull origin ramadesarollo  

## Preparación de versiones (release)

Cuando el sistema está listo para una versión, se crea una rama release desde develop:

git checkout develop  
git checkout -b release/v1.0  

En esta rama se realizan pruebas y ajustes finales.

Para pasar a producción:

git checkout main  
git merge release/v1.0  
git push  

Luego se integra también a develop:

git checkout ramadesarollo  
git merge release/v1.0  

## Correcciones urgentes (hotfix)

Si ocurre un error en producción, se crea una rama hotfix desde main:

git checkout main  
git checkout -b hotfix/error  

Luego de corregir:

git add .  
git commit -m "fix: corregir error crítico"  

Se integra a main:
git checkout main  
git merge hotfix/error  
git push  

Y también a ramadesarollo:
git checkout develop  
git merge hotfix/error  

## Reglas

- No hacer push directo a main  
- Todo desarrollo parte desde develop  
- Usar ramas feature para nuevas funcionalidades  
- Usar Pull Request para integrar cambios  
- Usar mensajes de commit claros:
  - feat: nueva funcionalidad  
  - fix: corrección de errores  
  - docs: documentación  
