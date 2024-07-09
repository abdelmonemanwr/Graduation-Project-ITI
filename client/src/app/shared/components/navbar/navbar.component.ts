import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  constructor(){}
  ngOnInit(): void {
    console.log('navbar on init called');
  }
  isLoggedIn(){

  }
  getUsername(){

  }
  logout(){

  }
}
