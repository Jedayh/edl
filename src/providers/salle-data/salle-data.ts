import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Salle } from '../../models/salle.model';

@Injectable()
export class SalleDataProvider {
  salle: Salle;
  nomPiece: string;
  propretePiece: string;
  etatPiece: string;
  indexSallePage: number;
  indexHomePage: number;

  constructor(public http: HttpClient) {
    console.log('Hello SalleDataProvider Provider');
  }
  setSalleData(salle: Salle) {
    this.salle = salle;
  }
  getSalleData(): Salle {
    return this.salle;
  }
  setNomPiece(nom: string) {
    this.nomPiece = nom;
  }
  getNomPiece(): string {
    return this.nomPiece;
  }
  setPropretePiece(etat: string) {
    this.propretePiece = etat;
  }
  getPropretePiece(): string {
    return this.propretePiece;
  }
  setEtatPiece(etat: string) {
    this.etatPiece = etat;
  }
  getEtatPiece(): string {
    return this.etatPiece;
  }
  setIndexSallePage(index: number) {
    this.indexSallePage = index;
  }
  getIndexSallePage(): number {
    return this.indexSallePage;
  }
}
