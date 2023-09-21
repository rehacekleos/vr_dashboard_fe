import { Component, OnInit } from '@angular/core';

import { navItems } from './_nav';
import { CustomTranslateService } from "../../shared/translate/services/custom-translate.service";
import { Translations } from "../../shared/translate/translate.model";
import { firstValueFrom, lastValueFrom } from "rxjs";
import { J } from "@angular/cdk/keycodes";

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit{

  public navItems

  constructor(private translateService: CustomTranslateService) {

  }


  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  async ngOnInit() {

    this.translateService.$languageChanged.subscribe(async () => {
      setTimeout(async () => {
        await this.setNavItems()
      }, 100)
    })

    await this.setNavItems()
  }

  async setNavItems() {
    const copy = JSON.parse(JSON.stringify(navItems));
    for (let i = 0; i < copy.length; i++) {
      copy[i].name = await firstValueFrom(this.translateService.get(copy[i].name))
    }
    this.navItems = copy;
  }
}
