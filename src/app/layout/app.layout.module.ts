import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { AppMenuComponent } from './app.menu.component';
import { AppMenuitemComponent } from './app.menuitem.component';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { AppTopBarComponent } from './app.topbar.component';
import { AppSidebarComponent } from './app.sidebar.component';
import { AppLayoutComponent } from './app.layout.component';
import { AppFooterComponent } from './app.footer.component';


@NgModule({
    declarations: [
        AppMenuitemComponent,
        AppMenuComponent,
        AppSidebarComponent,
        AppLayoutComponent,
        AppTopBarComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        InputTextModule,
        SidebarModule,
        BadgeModule,
        RadioButtonModule,
        InputSwitchModule,
        RippleModule,
        RouterModule,
        TooltipModule,
        AppFooterComponent,
    ],
    exports: [AppLayoutComponent],
})
export class AppLayoutModule {}
