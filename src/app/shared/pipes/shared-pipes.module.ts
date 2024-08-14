import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencySymbolPipe } from './currencySymbol.pipe';

@NgModule({
    imports: [
      CommonModule
    ],
    declarations: [
        CurrencySymbolPipe,
      ],
    exports: [
      CurrencySymbolPipe,
    ]
})
export class SharedPipesModule { }
