import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule, MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatDividerModule, MatSliderModule, MatProgressBarModule } from '@angular/material';

@NgModule({
  imports: [MatGridListModule, MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatDividerModule, MatSliderModule, MatProgressBarModule],
  exports: [MatGridListModule, MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatDividerModule, MatSliderModule, MatProgressBarModule],
})
export class MaterialModule { }