import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CdkAccordionModule } from '@angular/cdk/accordion';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { CdkMenuModule } from '@angular/cdk/menu';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatButtonModule } from '@angular/material/button'; // For navigation buttons
import { MatIconModule } from '@angular/material/icon'; // Optional icons
import { MatTabsModule } from '@angular/material/tabs';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalenderComponent } from './components/calender/calender.component';
import { ChangeDetectionPlayComponent } from './components/change-detection-play/change-detection-play.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { CustomRichTextEditorComponent } from './components/custom-rich-text-editor/custom-rich-text-editor.component';
import { GoogleChartsComponent } from './components/google-charts/google-charts.component';
import { MaterialAccordionComponent } from './components/material-accordion/material-accordion.component';
import { MaterialClipboardComponent } from './components/material-clipboard/material-clipboard.component';
import { MaterialSelectComponent } from './components/material-select/material-select.component';
import { MaterialStepperComponent } from './components/material-stepper/material-stepper.component';
import { MentionInputComponent } from './components/mention-input/mention-input.component';
import { MultiSelectComponent } from './components/multi-select/multi-select.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RichTextEditorUsageComponent } from './components/rich-text-editor-usage/rich-text-editor-usage.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { WavsurfComponent } from './components/wavsurf/wavsurf.component';
import { WidgetIconUpdaterComponent } from './components/widget-icon-updater/widget-icon-updater.component';
import { MultiSelectUsageComponent } from './components/multi-select-usage/multi-select-usage.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    StepperComponent,
    MaterialStepperComponent,
    MaterialClipboardComponent,
    ColorPickerComponent,
    MaterialAccordionComponent,
    MaterialSelectComponent,
    WidgetIconUpdaterComponent,
    WavsurfComponent,
    CalenderComponent,
    GoogleChartsComponent,
    MentionInputComponent,
    ChangeDetectionPlayComponent,
    NotFoundComponent,
    CustomRichTextEditorComponent,
    RichTextEditorUsageComponent,
    MultiSelectComponent,
    MultiSelectUsageComponent,
    HomeComponent,
  ],
  imports: [
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    CdkStepperModule,
    ClipboardModule,
    CdkAccordionModule,
    CdkMenuModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    NgbModule,
    NgSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
