import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule, MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatDividerModule, MatSliderModule, MatProgressBarModule, MatSnackBarModule, MatTooltipModule } from '@angular/material';

@NgModule({
  imports: [MatGridListModule, MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatDividerModule, MatSliderModule, MatProgressBarModule, MatSnackBarModule, MatTooltipModule],
  exports: [MatGridListModule, MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatDividerModule, MatSliderModule, MatProgressBarModule, MatSnackBarModule, MatTooltipModule],
})
export class MaterialModule { }