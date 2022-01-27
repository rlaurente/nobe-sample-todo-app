import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { GalleryService } from '../services/gallery.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {

  constructor(private gallerService: GalleryService) { }

  ngOnInit() {

  }

  add() {
    $('.file-upload').click();
  }

  async onSelectFile(e: any) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const result = await this.gallerService.Upload(file);
      console.log(result);
    } else {
      alert('please select a file')
    }

  }

}
