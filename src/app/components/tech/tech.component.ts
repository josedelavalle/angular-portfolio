import { Component, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import Swiper, { Autoplay, SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';


@Component({
  selector: 'app-tech',
  templateUrl: './tech.component.html',
  styleUrls: ['./tech.component.scss'],
  providers: []
})
export class TechComponent implements OnInit {
  @Input() rowCount!: number;
  
  public config: SwiperOptions = {
    navigation: true,
    slidesPerView: 1,
    loop: true,
    autoplay: {
        delay: 3000,
        }
        
  };

  carouselItems: any = [
    {
      name: "Angular 15",
      image: "../../assets/images/angular.png"
    },
    {
      name: ".NET WebApi - C#",
      image: "../../assets/images/csharp.png"
    },
    {
      name: "SQL Server",
      image: "../../assets/images/sqlserver.png"
    },
    {
      name: "CSS 3",
      image: "../../assets/images/css3.png"
    },
    {
      name: "HTML 5",
      image: "../../assets/images/html5.png"
    },
    {
      name: "Bootstrap 4",
      image: "../../assets/images/bootstrap.png"
    },
    {
      name: "Material Design",
      image: "../../assets/images/material.png"
    }
  ];
  @ViewChild('swiperRef', { static: false }) swiperRef?: SwiperComponent;
  constructor() {
    Swiper.use([Autoplay]);
    
   }

  ngOnInit() {
    setInterval(() => {
      try {
        if (this.swiperRef && this.swiperRef.swiperRef) {
          this.swiperRef?.swiperRef.slideNext();
        }  
      } catch (error) { }
      
    }, 3000);
    
  }
  
}
