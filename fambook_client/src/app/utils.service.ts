import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }
  
  openLink(url : string): void {
    window.open(url,"_blank");
    
  }
}
