import { Location } from '@angular/common';
import { EventEmitter, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalState } from 'src/app/components/default/modal/models/modal-state.model';
import { LoaderService } from '../loader/loader.service';
import { UserRepositoryService } from '../repository/user-repository/user-repository.service';

@Injectable({
  providedIn: 'root'
})
export class WebsiteStateService {

  isSidebarOpen = true;
  headerState = 'home';
  modalState: ModalState = { title: '', onClose: () => { }, onSubmit: () => { }};
  navigationHistory: string[] = [];
  public onSidebarStateChanged = new EventEmitter<boolean>();
  public onHeaderStateChanged = new EventEmitter<string>();
  public onLoginModalStateChanged = new EventEmitter<boolean>();
  constructor(private readonly router: Router, private readonly loaderService: LoaderService, private readonly location: Location, private readonly titleService: Title, private readonly route: ActivatedRoute, private readonly userRepository: UserRepositoryService, private readonly toastr: ToastrService) {
    router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        loaderService.hide();
        let page = this.formatUrl(ev.urlAfterRedirects);
        page = page ? page : 'Home';
        this.titleService.setTitle('Talkaboat - ' + page);
        if(ev.urlAfterRedirects.includes('sign-in')) {
          return;
        }
        this.navigationHistory.push(ev.urlAfterRedirects);
      }
    });
  }

  openModal() {
    this.onLoginModalStateChanged.emit(true);
  }

  formatUrl(url: any) {
    if (url.includes('?')) {
      url = url.substring(0, url.indexOf('?'));
    }
    url = url.replaceAll('/', '');
    url = this.titleCaseWord(url);
    return url;
  }

  SetHeaderState(state: string) {
    this.headerState = state;
    this.onHeaderStateChanged.emit(this.headerState);
  }

  titleCaseWord(word: string) {
    if (!word) { return word; }
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }

  public closeSidebarIfSmallerThanDefinedPixel() {
    if (this.isSidebarOpen && window.innerWidth <= 1474) {
      this.toggleSidebar(true, false);
    }
  }

  public toggleSidebar(forceState = false, state = false) {
    this.isSidebarOpen = forceState ? state : !this.isSidebarOpen;
    this.onSidebarStateChanged.emit(this.isSidebarOpen);
  }

  public canNavigateBack(): boolean {
    return this.navigationHistory.length > 1;
  }

  public backNavigation(changedQueryParams = null) {
    if (this.canNavigateBack()) {
      this.navigationHistory.pop();
      this.location.back();
    }
  }

  public backOrRootNavigation(changedQueryParams = null) {
    if (this.canNavigateBack()) {
      this.navigationHistory.pop();
      this.location.back();
    } else {
      this.router.navigate(['/home']);
    }
  }
}
