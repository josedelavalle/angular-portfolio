import { Component, OnInit } from '@angular/core';
import { SliderService } from '../../services/slider.service';
import { ColorService } from '../../services/color.service';
import { MediaChange, MediaObserver } from "@angular/flex-layout";
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  faDown: IconDefinition = faChevronDown;
  faUp: IconDefinition = faChevronUp;
  myData!: Array<any>;
  dataSet!: number;
  columnNum: number = 8;
  colorSet!: number;

  colorSets: Array<Array<string>> = [
    ['00563c','3b3b3b','2b6669','46aede','46aeb4'],
    ['5383bc','84b1f9','315178','3b3b3b','3f6a9d'],
    ['7f7bca','424242','a19ed9','292929','5c57bb'],
    ['ffffff','b7b7b7','e5e3e3','efefef','fefefe'],
    ['703e3c','b94a62','702e3c','703e3c','b94a62']
  ];

  defaultTiles: Array<any> = 
  [
    [{ id: 1, type: 'color', footer: 'Color controls', rowspan: 1, colspan: 1, colspanxs: 2, colspansm: 2, colspanmd: 1, colspanlg: 1, hiddenxs: true },
    { id: 3, type: 'iframe', footer: 'Compare and contrast country populations', rowspan: 3, colspan: 7, colspanxs: 2, rowspanxs: 4, colspanmd: 3, rowspanmd: 2, colspanlg: 5, colspanxl: 7, rowspanlg: 3,colspansm: 2, rowspansm: 3 },
    { id: 4, type: 'tech', footer: 'Some technologies used', rowspan: 2, colspan: 1, colspanxs: 1, rowspanxs: 1, rowspansm: 1, rowspanmd: 1, rowspanlg: 2},
    { id: 5, type: 'map', footer: 'How far you are from me', rowspan: 1, colspan: 6, colspanxs: 1, colspansm: 1, colspanmd: 3, colspanlg: 5, colspanxl: 6 },
    { id: 2, type: 'social', footer: 'Places to find me', rowspan: 1, colspan: 2, colspansm: 2, colspanxs: 2, colspanmd: 1, colspanlg: 1, colspanxl: 2 }],
    
    [{ id: 6, type: 'color', footer: 'Color controls', rowspan: 1, colspan: 1, colspanxs: 2, colspanmd: 1, colspansm: 2, colspanxl: 2, colspanlg: 1  },
    { id: 7, type: 'map', footer: 'How far you are from me', rowspan: 1, colspan: 7, colspanmd: 3, colspanxl: 6, colspanlg: 5, colspanxs: 2, colspansm: 2 },
    { id: 9, type: 'iframe', footer: 'Compiled internet news', rowspan: 3, colspan: 7, colspanxl: 7, colspanlg: 5, rowspanlg: 3, colspanmd: 3, rowspanmd: 2, colspansm: 2, colspanxs: 2, rowspansm: 2, rowspanxs: 4 },
    { id: 10, type: 'tech', footer: 'Some technologies used', rowspan: 2, rowspanmd: 1, rowspansm: 1, rowspanxs: 1, rowspanlg: 2, colspan: 1},
    { id: 8, type: 'social', footer: 'Places to find me', rowspan: 1, colspan: 1, rowspanlg: 1, rowspansm: 1, rowspanxs: 1 }],
    
    [{ id: 11, type: 'iframe', footer: 'Show photos taken at locations', rowspan: 3, colspan: 7, colspanxl: 7, colspanlg: 5, rowspanlg: 3, rowspanmd: 2, colspanmd: 3, colspanxs: 2, colspansm: 2, rowspanxs: 3, rowspansm: 2},
    { id: 12, type: 'color', footer: 'Color controls', rowspan: 1, colspan: 1, colspanxl: 1, colspanlg: 1, colspanmd: 1, colspansm: 2, colspanxs: 2 },
    { id: 13, type: 'tech', footer: 'Some technologies used', rowspan: 1, colspan: 1, rowspanxl: 1, rowspanlg: 2, rowspanmd: 2, rowspanxs: 1, },
    { id: 14, type: 'social', footer: 'Places to find me', rowspan: 1, colspan: 1 },
    { id: 15, type: 'map', footer: 'How far you are from me', colspanxs: 2, colspansm: 2, colspanxl: 8, rowspan: 1, colspan: 8, colspanmd: 2, colspanlg: 5 }],
    
    [{ id: 19, type: 'iframe', footer: 'Drill down for county government links and local photos', rowspan: 3, colspan: 7, colspanxl: 7, colspansm: 2, colspanxs: 2, rowspansm: 2, rowspanxs: 2, colspanmd: 3, rowspanmd: 2, colspanlg: 5, rowspanlg: 3 },
    { id: 16, type: 'color', footer: 'Color controls', rowspan: 1, colspan: 1, colspanmd: 1, colspansm: 2, colspanxs: 2 },
    { id: 17, type: 'tech', footer: 'Some technologies used', rowspan: 2, colspan: 1, rowspanlg: 2, rowspanmd: 1},
    { id: 18, type: 'map', footer: 'How far you are from me', rowspan: 1, colspan: 7, colspanxl: 7, colspanlg: 4, colspansm: 1, colspanxs: 1, colspanmd: 3 },
    { id: 21, type: 'social', footer: 'Places to find me', rowspan: 1, colspan: 1, colspanxl: 1, colspanmd: 1, colspanlg: 2, colspanxs: 2, colspansm: 2 }],

    [{ id: 28, type: 'color', footer: 'Color controls', rowspan: 1, colspan: 1, colspanxl: 1, colspanlg: 1, colspanmd: 1, colspanxs: 2, colspansm: 2, hiddenxs: true },
    { id: 29, type: 'iframe', footer: 'NASA Pic of the day and MARS rover images for desired date', rowspan: 3, colspan: 7, colspanxs: 2, rowspanxs: 4, colspanmd: 3, rowspanmd: 2, colspanlg: 5, colspanxl: 7, rowspanlg: 3, colspansm: 2, rowspansm: 3 },
    { id: 30, type: 'tech', footer: 'Some technologies used', rowspan: 2, colspan: 1, colspanxs: 1, rowspanxs: 1, rowspansm: 1, rowspanmd: 1, rowspanlg: 2},
    { id: 32, type: 'map', footer: 'How far you are from me', rowspan: 1, colspan: 6, colspanxs: 1, colspansm: 1, colspanmd: 3, colspanlg: 5, colspanxl: 6},
    { id: 33, type: 'social', footer: 'Places to find me', rowspan: 1, colspan: 1, colspansm: 2, colspanxs: 2, colspanmd: 1, colspanlg: 1, colspanxl: 2 }],

    [{ id: 23, type: 'color', footer: 'Color controls', rowspan: 1, colspan: 1 },
    { id: 27, type: 'tech', footer: 'Some technologies used', rowspan: 1, colspan: 1 },
    { id: 25, type: 'map', footer: 'How far you are from me', rowspan: 1, colspan: 6, colspanxl: 6, colspanlg: 4, colspanmd: 2, colspansm: 2, colspanxs: 2 },
    { id: 26, type: 'iframe', footer: 'A site about my development skills and experience.  Fill out contact form to reach out.', rowspan: 3, colspan: 8, colspanxl: 8, colspansm: 2, colspanxs: 2, colspanmd: 4, rowspanmd: 2, colspanlg: 6, rowspanlg: 3, rowspansm: 4, rowspanxs: 4 }]
	];
  //tiles: Array<any> = this.defaultTiles[0];
  tiles: Array<any> = [];
  size: string = '';
  constructor(private sliderDataService: SliderService, private colorDataService: ColorService, media: MediaObserver) {
    media.asObservable()
    .subscribe((change: MediaChange[]) => {
      this.size = change[0].mqAlias;
      this.updateTiles(change[0].mqAlias);
      if(change[0].mqAlias == 'xs'){
        this.columnNum = 2;
      }
      else if(change[0].mqAlias == 'sm'){
        this.columnNum = 2;
      }
      else if(change[0].mqAlias == 'md'){
        this.columnNum = 4;
      }
      else if(change[0].mqAlias == 'lg'){
        this.columnNum = 6;
      }
      else{
        this.columnNum = 8;
      }
    });
  }

  updateTiles(size: string) {
    var i = 0;
    if (!this.defaultTiles.length || !this.tiles.length) return;
    this.defaultTiles[this.dataSet - 1].forEach((element: { [x: string]: any; colspan: any; rowspan: any; }) => {
      if (element['colspan' + size]) {
        this.tiles[i].colspan = element['colspan' + size];
      } else {
        this.tiles[i].colspan = element.colspan;
      }
      if (element['rowspan' + size]) {
        this.tiles[i].rowspan = element['rowspan' + size];
      } else {
        this.tiles[i].rowspan = element.rowspan;
      }
      this.tiles[i].hideFooter = false;
      i++;
    });
  }

  ngOnInit() {
    this.sliderDataService.cast.subscribe((dataSet: number) => {
      this.dataSet = dataSet
      this.tiles = this.defaultTiles[this.dataSet - 1];
      this.updateTiles(this.size);
    });

    this.colorDataService.castColorSet.subscribe((dataSet: number) => {
      this.colorSet = dataSet;
    });
  }

}
