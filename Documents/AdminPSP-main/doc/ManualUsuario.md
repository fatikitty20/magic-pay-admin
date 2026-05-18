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
- Intenciones de pago
- Rechazadas
- Pagos exitosos
- Devoluciones
- Liquidaciones
- Consolidaciones
- Transacciones

## Dashboard

La vista Dashboard muestra:

- GMV total mock.
- Operaciones mock del dia.
- Liquidaciones por revisar.
- Consolidaciones listas.
- Conversion estimada.
- Graficas simuladas de pulso, rendimiento horario y distribucion de estados.

El boton `Actualizar` solo refresca la marca visual de tiempo; no consulta servicios externos.

## Vistas de pagos

Las vistas Intenciones de pago, Rechazadas, Pagos exitosos, Devoluciones y Transacciones muestran registros simulados con:

- Orden.
- Canal.
- Descripcion.
- Metodo.
- Estado.
- Fecha.
- Monto.

Estas pantallas no consultan endpoints y permiten descargar CSV con los datos mock visibles.

## Liquidaciones

La vista Liquidaciones muestra lotes simulados con:

- Canal.
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
