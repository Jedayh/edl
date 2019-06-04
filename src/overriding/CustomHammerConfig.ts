import { HammerGestureConfig } from '@angular/platform-browser';

export class CustomHammerConfig extends HammerGestureConfig {
    overrides = {
        'press': { time: 500 }  //set press delay for 1 second
    }
}
