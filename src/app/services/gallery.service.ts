import { Injectable } from '@angular/core';
import { apply, mock, request, upload } from '@rlaurente/nobe';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor() { }

  async Upload(file: any): Promise<string> {
    try {
      const formData = new FormData();
      formData.append("file", file);

      mock({
        url: `https://sample.app/api/files/upload`,
        handler: async data => {
          const _file = data.get('file');
          const result = await upload(_file);
          apply();
          return {
            data: {
              file: result
            }
          }
        }
      })

      const result = await request({
        data: formData,
        url: `https://sample.app/api/files/upload`,
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return result.data.file;
    } catch (e) {
      console.log('e', e)
      return '';
    }

  }
}
