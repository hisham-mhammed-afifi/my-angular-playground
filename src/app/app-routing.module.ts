import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangeDetectionPlayComponent } from './components/change-detection-play/change-detection-play.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MultiSelectUsageComponent } from './components/multi-select-usage/multi-select-usage.component';
import { RichTextEditorUsageComponent } from './components/rich-text-editor-usage/rich-text-editor-usage.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'play',
    component: ChangeDetectionPlayComponent,
  },
  {
    path: 'multi-select',
    component: MultiSelectUsageComponent,
  },
  {
    path: 'rich-text-editor',
    component: RichTextEditorUsageComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
