import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class CustomToastrService {

    constructor(public toastr: ToastrService) {
    }

    showToastMessage(message: string, timeout?: number, type?: 'danger' | 'warning' | 'success' | string) {
        const t = type || 'success';
        this.toastr.show(
            `<div class="alert alert-${t}">${message}</div>`,
            '',
            {
                timeOut: timeout || 3000,
                closeButton: false,
                enableHtml: true,
                tapToDismiss: false,
                positionClass: 'toast-top-center',
                toastClass: 'ngx-toastr'
            }
        );
    }
}
