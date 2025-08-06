import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-material-clipboard',
  templateUrl: './material-clipboard.component.html',
  styleUrls: ['./material-clipboard.component.css'],
})
export class MaterialClipboardComponent implements OnInit {
  value =
    `Did you ever hear the tragedy of Darth Plagueis The Wise? I thought not. It's not ` +
    `a story the Jedi would tell you. It's a Sith legend. Darth Plagueis was a Dark Lord ` +
    `of the Sith, so powerful and so wise he could use the Force to influence the ` +
    `midichlorians to create life… He had such a knowledge of the dark side that he could ` +
    `even keep the ones he cared about from dying. The dark side of the Force is a pathway ` +
    `to many abilities some consider to be unnatural. He became so powerful… the only ` +
    `thing he was afraid of was losing his power, which eventually, of course, he did. ` +
    `Unfortunately, he taught his apprentice everything he knew, then his apprentice ` +
    `killed him in his sleep. Ironic. He could save others from death, but not himself.`;

  constructor(private testSrv: TestService) {}

  ngOnInit(): void {}
}
