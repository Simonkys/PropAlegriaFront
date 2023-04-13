import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';

import { EmptyDemoRoutingModule } from './emptydemo-routing.module';
import { EmptyDemoComponent } from './emptydemo.component';

@NgModule({
    imports: [CommonModule, EmptyDemoRoutingModule, InputTextModule],
    declarations: [EmptyDemoComponent],
})
export class EmptyDemoModule {}
