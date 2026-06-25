import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Navbar } from '../components/navbar/navbar.component';
import { Sidebar } from '../components/sidebar/sidebar.component';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    Navbar,
    Sidebar
  ],
  templateUrl: './dashboard.component.html'
})
export class Dashboard {

}