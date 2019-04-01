import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'First-NGXS-App';
  public clickedEvent: Event;

  childEventClicked(event: Event) {
    this.clickedEvent = event;
  }
}
