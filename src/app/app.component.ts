import { Component, OnInit } from '@angular/core';
import { setConfig } from '@rlaurente/nobe';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    setConfig({
      is_debug: false,
      is_mock: true
    })
  }
}
