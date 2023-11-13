import { MessageService } from 'primeng/api';
import { Resource } from 'src/app/resources/resource';

export class MessageServiceUtils {
  constructor(
    private messageService: MessageService,
    private ressource: Resource,
  ) {}

  error(message?: string) {
    this.messageService.add({
      severity: 'error',
      summary: this.ressource.toast.error,
      detail: message ?? this.ressource.toast.errorDescription,
      life: 3000,
    });
  }

  success(message?: string) {
    console.log(this.ressource.toast.success);
    this.messageService.add({
      severity: 'success',
      summary: this.ressource.toast.success,
      detail: message ?? this.ressource.toast.errorDescription,
      life: 3000,
    });
  }

  info(message?: string) {
    this.messageService.add({
      severity: 'info',
      summary: this.ressource.toast.info,
      detail: message ?? this.ressource.toast.errorDescription,
      life: 3000,
    });
  }

  warn(message?: string) {
    this.messageService.add({
      severity: 'warn',
      summary: this.ressource.toast.warning,
      detail: message ?? this.ressource.toast.errorDescription,
      life: 3000,
    });
  }
}
