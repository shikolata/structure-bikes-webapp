import { Component, OnInit, inject } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterOutlet]
})
export class AppComponent implements OnInit {
  private translateService: TranslateService = inject(TranslateService);
  title = 'structure-bikes-webapp';

  ngOnInit(): void {
    if (this.translateService.store.langs.length === 0) {
      this.translateService.addLangs(['en', 'es']);
      this.translateService.setDefaultLang('en');
      this.translateService.use('en');

      // const browserLang = this.translateService.getBrowserLang();
      // this.translateService.use(browserLang.match(/en|/) ? browserLang : 'en');
    }
  }
}
