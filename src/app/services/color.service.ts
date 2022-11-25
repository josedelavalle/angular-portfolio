import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private colorSet = new BehaviorSubject<number>(1);
  castColorSet = this.colorSet.asObservable();
  maxColorSet: number = 5;

  private isCycling = new BehaviorSubject<boolean>(false);
  castCycling = this.isCycling.asObservable();
  constructor() { }

  nextDataSet() {
    var newDataSet = this.colorSet.value;
    console.log(newDataSet);
    newDataSet++;
    if (newDataSet >= this.maxColorSet) newDataSet = 0;
    console.log(newDataSet);
    this.getColorSet(newDataSet);
  }
  
  prevDataSet() {
    var newDataSet = this.colorSet.value;
    newDataSet--;
    if (newDataSet === 0) newDataSet = this.maxColorSet;
    this.getColorSet(newDataSet);
  }

  toggleCycling(val: boolean) {
    this.isCycling.next(val);
  }

  getColorSet(i: number) {
    this.colorSet.next(i);
  }
}

