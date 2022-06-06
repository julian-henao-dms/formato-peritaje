import { ElementosAz } from "src/app/components/formato-peritaje/interfaces/elementos-az";
import { EstadoPintura } from "src/app/components/formato-peritaje/interfaces/estado-pintura";

export interface Global {
  isEmpty: boolean,
  listaPartes: EstadoPintura[];
  listaElementos: ElementosAz[]
}

