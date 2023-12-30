import {Component, Signal, inject} from '@angular/core';
import {Languages, Page} from '../../constants';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe } from '@angular/common';
import { StructureBikesStore } from 'src/store/sturucture-bikes.store';
import { SignalStoreProps } from '@ngrx/signals/src/signal-store-models';

@Component({
    selector: 'app-language-selector',
    templateUrl: './language-selector.component.html',
    styleUrls: ['./language-selector.component.scss'],
    standalone: true,
    imports: [MatFormFieldModule, MatSelectModule, MatOptionModule, TranslateModule]
})
export class LanguageSelectorComponent {
  private structureBikesStore: SignalStoreProps<any> = inject(StructureBikesStore);
  private translateService: TranslateService = inject(TranslateService);
  
  currentPage: Signal<Page> = this.structureBikesStore.currentPage;
  page = Page;

  currentLanguage(lang: string): string {
    return Languages[lang];
  }

  get translate() {
    return this.translateService;
  }
}
