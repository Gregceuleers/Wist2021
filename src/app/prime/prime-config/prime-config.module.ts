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
import {KnobModule} from "primeng/knob";
import {SelectButtonModule} from "primeng/selectbutton";
import {TableModule} from "primeng/table";
import {TreeSelectModule} from "primeng/treeselect";

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
    ListboxModule,
    KnobModule,
    SelectButtonModule,
    TableModule,
    TreeSelectModule
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
    ListboxModule,
    KnobModule,
    SelectButtonModule,
    TableModule,
    TreeSelectModule
  ]
})
export class PrimeConfigModule { }
