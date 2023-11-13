import {Component} from '@angular/core';
import {Languages, Page} from '../../constants';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {StructureBikesFacade} from "../../../store/structure-bikes.facade";

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent {
  currentPage$: Observable<Page> = this.structureBikesFacade.currentPage$;
  page = Page;

  constructor(private translateService: TranslateService,
              private structureBikesFacade: StructureBikesFacade) {}

  currentLanguage(lang: string): string {
    return Languages[lang];
  }

  get translate() {
    return this.translateService;
  }
}
