import { Encabezados } from "../../components/formato-peritaje/interfaces/encabezados.interface";
import { formulario } from "../../components/formato-peritaje/interfaces/formulario.interface";

export interface Global {
  isEmpty: boolean,
  formulario: formulario,
  encabezados: Encabezados
}
