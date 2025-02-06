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
import { TooltipModule } from 'primeng/tooltip';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './lang/', '.json');
}

interface LanguageOption {
  value: string,
  language: string
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, ButtonModule, CardModule, CascadeSelectModule, DialogModule, SelectModule, ReactiveFormsModule, TranslatePipe, TooltipModule],
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
    translate.use(sessionStorage.getItem('preferredLang') || 'ENG');

    this.updateLanguageOptions();
    translate.onLangChange.subscribe(() => {
      this.updateLanguageOptions();
    });

    const lightPref = sessionStorage.getItem('lightMode')
    if (lightPref && JSON.parse(lightPref)) {
      this.toggleDarkMode()
    }
  }

  updateLanguageOptions() {
    this.languages = [
      { value: 'ENG', language: this.translate.instant('ENG') },
      { value: 'GEO', language: this.translate.instant('GEO') }
    ];

    const currLang = this.translate.currentLang;
    this.form.get('lang')?.setValue({ value: currLang, language: this.translate.instant(currLang) });
  }

  isDarkMode(): boolean {
    const element = document.querySelector('html');
    if (element == null) {
      console.error("Could not find HTML element!");
      return false;
    }
    return element.classList.contains('my-app-dark');
  }
  toggleDarkMode() {
    const element = document.querySelector('html');
    if (element == null) {
      console.error("Could not find HTML element!");
      return;
    }
    element.classList.toggle('my-app-dark');

    sessionStorage.setItem('lightMode', JSON.stringify(!this.isDarkMode()))
  }

  switchLang(lang: LanguageOption) {
    sessionStorage.setItem('preferredLang', lang.value);
    this.translate.use(lang.value);
  }

  showDialog() {
    this.visible = !this.visible;
  }
}
