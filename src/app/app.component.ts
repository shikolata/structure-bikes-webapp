import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'structure-bikes-webapp';

  constructor(private translateService: TranslateService) {
    if (this.translateService.store.langs.length === 0) {
      this.translateService.addLangs(['en', 'es']);
      this.translateService.setDefaultLang('en');
      this.translateService.use('en');

      // const browserLang = this.translateService.getBrowserLang();
      // this.translateService.use(browserLang.match(/en|/) ? browserLang : 'en');
    }
  }
}
