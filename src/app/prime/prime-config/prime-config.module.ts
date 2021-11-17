import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { CardModule} from 'primeng/card';
import { ButtonModule} from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MenubarModule,
    CardModule,
    ButtonModule,
    AvatarModule

  ], exports: [
    MenubarModule,
    CardModule,
    ButtonModule,
    AvatarModule
  ]
})
export class PrimeConfigModule { }
