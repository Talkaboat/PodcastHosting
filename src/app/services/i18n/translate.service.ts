import { Injectable } from "@angular/core";
import { en } from "./languages/en";
import { de } from "./languages/de";
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitter } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TranslateService {
  private locale = "";
  public localeShort = "";
  private dictionary: any = { lang: 'de' };
  private langQueryIdentifier = "lang";
  public onUpdateLanguage = new EventEmitter<void>()

  constructor(private readonly activatedRoute: ActivatedRoute, private readonly router: Router) {
    const lang = this.getParameterValue(window.location.href, this.langQueryIdentifier);
    if (!lang) {
      this.changeLanguage(this.getUsersLocale("en-US"), true);
    } else {
      this.changeLanguage(lang, true);
    }
  }

  public changeLanguage(lang: string, skipQueryChange = false): string {
    this.locale = lang;
    localStorage.setItem('lang', lang);
    if (lang === "de-DE") {
      this.dictionary = de;
      this.localeShort = "de";
    } else {
      this.dictionary = en;
      this.localeShort = "en";
    }
    // if (!skipQueryChange && !window.location.href.includes('readdir')) {
    //   window.location.reload();
    // }
    this.onUpdateLanguage.emit();
    return this.locale;
  }

  updateURLParameter(url: string, param: string, paramVal: string) {
    let newAdditionalURL = "";
    let tempArray = url.split("?");
    let baseURL = tempArray[0];
    let additionalURL = tempArray[1];
    let temp = "";
    if (additionalURL) {
      tempArray = additionalURL.split("&");
      for (let i = 0; i < tempArray.length; i++) {
        if (tempArray[i].split("=")[0] != param) {
          newAdditionalURL += temp + tempArray[i];
          temp = "&";
        }
      }
    }

    let rows_txt = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newAdditionalURL + rows_txt;
  }

  getParameterValue(url: string, param: string) {
    let tempArray = url.split("?");
    let additionalURL = tempArray[1];
    if (additionalURL) {
      tempArray = additionalURL.split("&");
      for (let i = 0; i < tempArray.length; i++) {
        var paramArray = tempArray[i].split("=");
        if (paramArray[0] == param) {
          return paramArray[1];
        }
      }
    }
    return '';
  }

  public toggle() {
    this.changeLanguage(this.locale != "de-DE" ? "de-DE" : "en-US");
  }

  getUsersLocale(defaultValue: string): string {
    if (localStorage.getItem('lang')) {
      return localStorage.getItem('lang')!;
    }
    if ((typeof window === 'undefined' || typeof navigator === 'undefined')) {
      return defaultValue;
    }
    const wn = navigator as any;
    let lang = wn.languages ? wn.languages[0] : defaultValue;
    lang = lang || wn.language || wn.browserLanguage || wn.userLanguage;
    return lang;
  }

  public transform(code: string, args?: any) {
    let result: string;

    if (!this.locale && !this.changeLanguage(this.getParameterValue(window.location.href, this.langQueryIdentifier), true)) {
      this.locale = "en-US";
      this.dictionary = en;
    }

    result = this.dictionary[code];

    for (const arg in args) {
      if (args.hasOwnProperty(arg)) {
        result = result.replace("${" + arg + "}", args[arg]);
      }
    }

    if (!result) {
      return code;
    }
    return result;
  }
}
