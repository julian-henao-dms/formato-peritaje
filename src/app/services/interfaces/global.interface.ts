import { ElementosAz } from "../../components/elementos-form-peritaje/interfaces/elementosAZ.interface";
import { Encabezados } from "../../components/formato-peritaje/interfaces/encabezados.interface";
import { EstadoPintura } from "../../components/partes-form-peritaje/interfaces/estadoPintura.interface";
import { formulario } from "../../components/busqueda-form-peritaje/interfaces/formulario.interface";

export interface Global {
  isEmpty: boolean,
  formulario: formulario,
  encabezados: Encabezados,
  listaPartes: EstadoPintura[],
  listaElementos: ElementosAz[]
}
