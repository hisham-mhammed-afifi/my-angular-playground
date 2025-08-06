import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record';

@Component({
  selector: 'app-wavsurf',
  templateUrl: './wavsurf.component.html',
  styleUrls: ['./wavsurf.component.css'],
})
export class WavsurfComponent implements OnInit, AfterViewInit {
  wavesurfer!: WaveSurfer | undefined;
  record!: RecordPlugin;

  @ViewChild('waveform', { static: true }) waveform!: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.createWaveSurfer();
  }

  createWaveSurfer = () => {
    // Destroy the previous wavesurfer instance
    if (this.wavesurfer) {
      this.wavesurfer.destroy();
    }

    // Create a new Wavesurfer instance
    this.wavesurfer = WaveSurfer.create({
      container: this.waveform.nativeElement,
      barGap: 3,
      barWidth: 3,
      barHeight: 2,
      barRadius: 3,
      cursorWidth: 1,
      height: 100,
      waveColor: 'rgb(0, 0, 200)',
      progressColor: 'rgb(100, 0, 0)',
    });

    // Initialize the Record plugin
    this.record = this.wavesurfer.registerPlugin(
      RecordPlugin.create({
        renderRecordedAudio: false,
        scrollingWaveform: false,
        continuousWaveform: true,
        continuousWaveformDuration: 30, // optional
      })
    );

    if (!this.wavesurfer) return;

    // Render recorded audio
    this.record.on('record-pause', (blob: Blob) => {
      this.wavesurfer?.loadBlob(blob);
      this.wavesurfer?.playPause();
    });

    this.record.on('record-end', (blob: Blob) => {
      this.wavesurfer?.loadBlob(blob);
      this.wavesurfer?.playPause();
    });

    this.record.on('record-progress', (time: any) => {
      // updateProgress(time);
    });
  };
}
