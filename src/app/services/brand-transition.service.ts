import {Injectable, signal} from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class BrandTransitionService {
    readonly isActive = signal(false);
    readonly progress = signal(1);

    activate(): void {
        this.isActive.set(true);
    }

    deactivate(): void {
        this.progress.set(1);
        this.isActive.set(false);
    }

    setProgress(progress: number): void {
        const clampedProgress = Math.min(Math.max(progress, 0), 1);
        this.progress.set(clampedProgress);
    }
}
