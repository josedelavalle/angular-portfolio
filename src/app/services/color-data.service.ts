import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ColorDataService {
  private colorSet = new BehaviorSubject<number>(1);
  castColorSet = this.colorSet.asObservable();
  maxColorSet: number = 5;

  private isCycling = new BehaviorSubject<boolean>(false);
  castCycling = this.isCycling.asObservable();
  constructor() { }

  nextDataSet() {
    var newDataSet = this.colorSet.value;
    newDataSet++;
    if (newDataSet > this.maxColorSet) newDataSet = 1;
    this.getColorSet(newDataSet);
  }
  
  prevDataSet() {
    var newDataSet = this.colorSet.value;
    newDataSet--;
    if (newDataSet === 0) newDataSet = this.maxColorSet;
    this.getColorSet(newDataSet);
  }

  toggleCycling(b) {
    console.log('toggle cycling', b);
    this.isCycling.next(b);
  }

  getColorSet(i) {
    this.colorSet.next(i);
  }
}
