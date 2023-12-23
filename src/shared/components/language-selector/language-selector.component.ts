import {Component, inject} from '@angular/core';
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
  private translateService: TranslateService = inject(TranslateService);
  private structureBikesFacade: StructureBikesFacade = inject(StructureBikesFacade);
  
  currentPage$: Observable<Page> = this.structureBikesFacade.currentPage$;
  page = Page;

  currentLanguage(lang: string): string {
    return Languages[lang];
  }

  get translate() {
    return this.translateService;
  }
}
