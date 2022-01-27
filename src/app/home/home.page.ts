import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { init } from '@rlaurente/nobe';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private nav: NavController) { }


  ngOnInit() {
    this.init();
  }

  async init(){
    try{
      const result = await init({
        git_url: 'https://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@github.com/rlaurente/sample-nobe-data.git',
        branch: 'master'
      });
      console.log(result)
    }catch(e){
      console.log('init failed');
    }
  }
  changePage(url: string){
    this.nav.navigateForward(url);
  }

}
