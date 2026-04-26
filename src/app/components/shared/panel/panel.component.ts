import {ChangeDetectionStrategy, Component} from '@angular/core';


@Component({
    selector: 'fa-panel, [faPanel]',
    template: '<ng-content />',
    styleUrl: './panel.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelComponent {}
