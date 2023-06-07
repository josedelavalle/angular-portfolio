import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  private dataSet = new BehaviorSubject<number>(1);
  private hashbang = new BehaviorSubject<string>('');
  cast = this.dataSet.asObservable();
  castHash = this.hashbang.asObservable();
  maxDataSet: number = 5;
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

  setDataSet(x: number) {
    this.dataSet.next(x);
  }

  setHashbang(h: string) {
    this.hashbang.next(h);
  }
}
