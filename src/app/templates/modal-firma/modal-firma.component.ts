import { Component, OnInit, Inject, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-firma',
  templateUrl: './modal-firma.component.html',
  styleUrls: ['./modal-firma.component.scss']
})
export class ModalFirmaComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasFirmaRef', { static: false }) canvasFirmaRef: any;
  private cx: CanvasRenderingContext2D;
  public width = 300;
  public height = 200;
  private puntos: Array<any> = [];
  private trazados: Array<any> = [];
  private dibujar: boolean = false;
  private factor: number = 5;
  public firma: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {
    this.cx = Object.create(CanvasRenderingContext2D.prototype);
  }

  ngOnInit(): void {
  }

  async ngAfterViewInit(): Promise<void> {
    this.render();
  }

  private async render(): Promise<any> {
    const canvasEl = this.canvasFirmaRef.nativeElement;
    this.cx = canvasEl.getContext('2d');
    canvasEl.width = this.width;
    canvasEl.height = this.height;
    this.cx.lineWidth = 3;
    this.cx.lineJoin = 'round';
    this.cx.strokeStyle = '#000';
  }

  @HostListener('document:touchstart', ['$event'])
  onTouchStart = (e: any) => {
    if (e.target.id === 'canvasFirma') {
      this.dibujar = true;
      this.puntos.length = 0;
      this.cx.beginPath();
    }
  }

  @HostListener('document:touchmove', ['$event'])
  onTouchMove = (e: any) => {
    if (e.target.id === 'canvasFirma' && this.dibujar) this.writeMovil(e);
  }

  @HostListener('document:touchend', ['$event'])
  onTouchEnd = (e: any) => {
    if (e.target.id === 'canvasFirma') this.newDrawOnCanvas();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove = (e: any) => {
    if (e.target.id === 'canvasFirma' && this.dibujar) this.writePC(e);
  }

  @HostListener('document:mousedown', ['$event'])
  onMouseDown = (e: any) => {
    if (e.target.id === 'canvasFirma') {
      this.dibujar = true;
      this.puntos.length = 0;
      this.cx.beginPath();
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp = (e: any) => {
    if (e.target.id === 'canvasFirma') this.newDrawOnCanvas();
  }

  private writeMovil(element: any): any {
    const canvasEl = this.canvasFirmaRef.nativeElement;
    const rect = canvasEl.getBoundingClientRect();
    const posicion = {
      x: element.targetTouches[0].pageX - rect.left,
      y: element.targetTouches[0].pageY - rect.top
    };
    this.drawOnCanvas(posicion);
  }

  private writePC(element: any): any {
    const canvasEl = this.canvasFirmaRef.nativeElement;
    const rect = canvasEl.getBoundingClientRect();
    const posicion = {
      x: element.clientX - rect.left,
      y: element.clientY - rect.top
    };
    this.drawOnCanvas(posicion);
  }

  private async drawOnCanvas(posicion: { x: number; y: number; }): Promise<void> {
    if (!this.cx) return;
    if (posicion) {
      this.puntos.push(posicion);
      this.cx.lineTo(posicion.x, posicion.y);
      this.cx.stroke();
    }
  }

  private async newDrawOnCanvas(): Promise<void> {
    this.dibujar = false;
    this.cx.clearRect(0, 0, this.width, this.height);
    await this.reducirTrazado(this.factor, this.puntos);
    for (let i = 0; i < this.trazados.length; i++) {
      const e = this.trazados[i];
      await this.suavizarTrazado(e);
    }
    const canvasEl = this.canvasFirmaRef.nativeElement;
    const dataUrl = canvasEl.toDataURL('image/png');
    this.data.firma = dataUrl
  }

  private async reducirTrazado(param: any, array: Array<any>): Promise<void> {
    const temp = [];
    temp[0] = array[0];
    for (let i = 0; i < array.length; i++) {
      const e = array[i];
      if (i % param === 0) temp[temp.length] = e;
    }
    temp[temp.length - 1] = array[array.length - 1];
    this.trazados.push(temp);
  }

  private async suavizarTrazado(array: Array<any>): Promise<void> {
    if (array.length > 1) {
      const final = array.length - 1;
      this.cx.beginPath();
      this.cx.moveTo(array[0].x, array[0].y);
      for (let i = 0; i < array.length - 2; i++) {
        const e = array[i];
        const pto = await this.calcularPuntoControl(array, i, (i + 1));
        this.cx.quadraticCurveTo(array[i].x, array[i].y, pto.x, pto.y);
      }
      this.cx.quadraticCurveTo(array[final - 1].x, array[final - 1].y, array[final].x, array[final].y);
      this.cx.stroke();
    }
  }

  private async calcularPuntoControl(array: Array<any>, a: number, b: number): Promise<any> {
    const obj = {
      x: (array[a].x + array[b].x) / 2,
      y: (array[a].y + array[b].y) / 2
    };
    return obj;
  }

  public limpiarCanvas(): void {
    this.puntos = [];
    this.trazados = [];
    this.cx.clearRect(0, 0, this.width, this.height);
  }

}
