import {ChangeDetectionStrategy, Component} from '@angular/core';


@Component({
  selector: 'fa-logo',
  imports: [],
  templateUrl: './logo.html',
  styleUrl: './logo.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Logo {

}
