import {Component, computed, inject} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {BrandTransitionService} from './services/brand-transition.service';
import {HeaderComponent} from './components/layout/header/header.component';
import {FooterComponent} from './components/layout/footer/footer.component';
import {Logo} from './logo/logo';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, HeaderComponent, FooterComponent, Logo, RouterLink],
    templateUrl: './app.html',
    styleUrl: './app.scss'
})
export class App {
    private readonly brandTransitionService = inject(BrandTransitionService);

    readonly brandProgress = computed(() => `${this.brandTransitionService.progress()}`);
}
