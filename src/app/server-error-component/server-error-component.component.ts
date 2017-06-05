
import { Component, ErrorHandler, Injectable, Injector} from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class ServerErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}
  handleError(error) {
    const router = this.injector.get(Router);
    console.log(error);
    if (error.status==500) {
      router.navigate(['/servererror']);
    }

  }

}

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error-component.component.html'
})
export class ServerErrorComponent {
}
