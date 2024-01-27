import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

export type ToastSeverity = 'success' | 'info' | 'error' | 'warning';

export type ToastParams = {
  title?: string;
  content?: string;
  life?: number;
};

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  private readonly messageService = inject(MessageService);

  public pop(severity: ToastSeverity, params: ToastParams) {
    this.messageService.add({
      severity: severity,
      summary: params.title,
      detail: params.content,
      life: params.life,
    });
  }

  public success(params: ToastParams) {
    this.pop('success', params);
  }

  public warning(params: ToastParams) {
    this.pop('warning', params);
  }

  public error(params: ToastParams) {
    this.pop('error', params);
  }

  public info(params: ToastParams) {
    this.pop('info', params);
  }
}
