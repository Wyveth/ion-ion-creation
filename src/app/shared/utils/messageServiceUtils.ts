import { MessageService } from 'primeng/api';
import { Resource } from 'src/app/resources/resource';

export class MessageServiceUtils {
  constructor(
    private messageService: MessageService,
    private resource: Resource,
  ) {}

  error(message?: string) {
    this.messageService.add({
      severity: 'error',
      summary: '',
      detail: message ?? '',
    });
  }

  warning(message?: string) {
    this.messageService.add({
      severity: 'warn',
      summary: '',
      detail: message ?? '',
    });
  }

  info(message?: string) {
    this.messageService.add({
      severity: 'info',
      summary: '',
      detail: message ?? '',
    });
  }

  success(message?: string) {
    this.messageService.add({
      severity: 'success',
      summary: '',
      detail: message ?? '',
    });
  }
}
