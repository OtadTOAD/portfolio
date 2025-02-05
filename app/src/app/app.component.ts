import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './lang/', '.json');
}

interface LanguageOption {
  value: string,
  language: string
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, ButtonModule, CardModule, CascadeSelectModule, DialogModule, SelectModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app';
  visible = false;
  selectedLanguage = "EN";
  languages: LanguageOption[] = [];
  form = new FormGroup({
    lang: new FormControl({} as LanguageOption, Validators.required)
  });

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('ENG');
    translate.use('ENG');

    this.updateLanguageOptions();
    translate.onLangChange.subscribe(() => {
      this.updateLanguageOptions();
    });
  }

  updateLanguageOptions() {
    this.languages = [
      { value: 'ENG', language: this.translate.instant('ENG') },
      { value: 'GEO', language: this.translate.instant('GEO') }
    ];

    console.log(this.form.get('lang')?.value)
    console.log(this.translate.currentLang)
    const currLang = this.translate.currentLang;
    this.form.get('lang')?.setValue({ value: currLang, language: this.translate.instant(currLang) });
  }

  switchLang(lang: LanguageOption) {
    this.translate.use(lang.value);
  }

  showDialog() {
    this.visible = !this.visible;
  }
}
