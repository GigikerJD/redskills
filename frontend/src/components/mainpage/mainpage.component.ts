import { Component } from '@angular/core';
import { CoreService } from '../../config/services/core.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainpage',
  imports: [ReactiveFormsModule],
  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.scss'
})
export class MainpageComponent {
  
  word: string = "React";
  
  constructor(public core: CoreService, private router: Router) {}

  userID = new FormControl('');

}
