import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { CardModule} from 'primeng/card';
import { ButtonModule} from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import {StepsModule} from "primeng/steps";
import {MessageModule} from "primeng/message";
import {ToastModule} from "primeng/toast";
import {DropdownModule} from "primeng/dropdown";
import {MultiSelectModule} from "primeng/multiselect";
import {ListboxModule} from "primeng/listbox";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MenubarModule,
    CardModule,
    ButtonModule,
    AvatarModule,
    StepsModule,
    MessageModule,
    ToastModule,
    DropdownModule,
    MultiSelectModule,
    ListboxModule

  ], exports: [
    MenubarModule,
    CardModule,
    ButtonModule,
    AvatarModule,
    StepsModule,
    MessageModule,
    ToastModule,
    DropdownModule,
    MultiSelectModule,
    ListboxModule
  ]
})
export class PrimeConfigModule { }
