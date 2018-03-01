import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SliderDataService {
  private dataSet = new BehaviorSubject<number>(1);
  private hashbang = new BehaviorSubject<string>('');
  cast = this.dataSet.asObservable();
  castHash = this.hashbang.asObservable();
  maxDataSet: number = 6;
  constructor() { }

  nextDataSet() {
    var newDataSet = this.dataSet.value;
    newDataSet++;
    if (newDataSet > this.maxDataSet) newDataSet = 1;
    this.dataSet.next(newDataSet);
  }
  
  prevDataSet() {
    var newDataSet = this.dataSet.value;
    newDataSet--;
    if (newDataSet === 0) newDataSet = this.maxDataSet;
    this.dataSet.next(newDataSet);
  }

  setDataSet(x) {
    this.dataSet.next(x);
  }

  setHashbang(h) {
    this.hashbang.next(h);
  }
}
