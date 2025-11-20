import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-mainpage',
  imports: [NgIf],
  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.scss'
})
export class MainpageComponent {
  
  word: string = "React";
}
