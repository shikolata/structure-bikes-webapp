import {Component} from '@angular/core';
import {Languages, Page} from '../../constants';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {StructureBikesFacade} from "../../../store/structure-bikes.facade";
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-language-selector',
    templateUrl: './language-selector.component.html',
    styleUrls: ['./language-selector.component.scss'],
    standalone: true,
    imports: [NgIf, MatFormFieldModule, MatSelectModule, NgFor, MatOptionModule, AsyncPipe, TranslateModule]
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
