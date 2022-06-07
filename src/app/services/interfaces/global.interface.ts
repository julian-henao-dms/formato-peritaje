import { ElementosAz } from "../../components/formato-peritaje/interfaces/elementos-az";
import { Encabezados } from "../../components/formato-peritaje/interfaces/encabezados.interface";
import { EstadoPintura } from "../../components/formato-peritaje/interfaces/estadoPintura.interface";
import { formulario } from "../../components/formato-peritaje/interfaces/formulario.interface";

export interface Global {
  isEmpty: boolean,
  formulario: formulario,
  encabezados: Encabezados,
  listaPartes: EstadoPintura[],
  listaElementos: ElementosAz[]
}
