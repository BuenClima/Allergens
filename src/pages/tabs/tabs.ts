import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ProfilePage} from "../profile/profile";

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.html',
  styles: [
    `
      ion-tabs {
        margin-bottom: 20px;
      }
    `,
    `
      ion-tabs,
      ion-tabs .tabbar {
        position: relative;
        top: auto;
        height: auto;
        visibility: visible;
        opacity: 1;
      }
    `
  ]
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ProfilePage;

  constructor() {

  }
}
