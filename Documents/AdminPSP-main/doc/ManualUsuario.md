# Manual de Usuario - Magic Pay Mock

Este manual describe el prototipo administrativo actual. La informacion mostrada es mock y sirve para validar pantallas, navegacion y distribucion visual.

## Ingreso

1. Abra la aplicacion.
2. Ingrese con:
   - Correo: `admin@magicpay.com`
   - Password: `Admin123!`
3. Presione `Ingresar`.

## Menu

El menu contiene:

- Dashboard
- Liquidaciones
- Consolidaciones

## Dashboard

La vista Dashboard muestra:

- GMV total mock.
- Operaciones mock del dia.
- Liquidaciones por revisar.
- Consolidaciones listas.
- Conversion estimada.
- Graficas simuladas de pulso, rendimiento horario y distribucion de estados.

El boton `Actualizar` solo refresca la marca visual de tiempo; no consulta servicios externos.

## Liquidaciones

La vista Liquidaciones muestra lotes simulados con:

- Comercio.
- Periodo.
- Monto bruto.
- Comision.
- Neto.
- Estado.
- Programacion.

Los estados visibles son `Lista`, `Programada`, `En revision` y `Retenida`.

## Consolidaciones

La vista Consolidaciones muestra fuentes simuladas con:

- Fuente.
- Procesado.
- Conciliado.
- Diferencia.
- Registros.
- Estado.
- Ultima actualizacion.

Los estados visibles son `Conciliada`, `Con diferencia` y `Pendiente`.

## Cierre de sesion

Use `Cerrar sesion` en la parte inferior del menu lateral. El cierre limpia la sesion mock local.
