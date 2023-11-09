import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from 'src/app/core/state/core.state';
import { MessageService } from 'primeng/api';
import { AppResource } from 'src/app/app.resource';
import { Resource } from 'src/app/resources/resource';
import { Router } from '@angular/router';
import { MessageServiceUtils } from '../../utils/messageServiceUtils';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit {
  public resource: Resource;
  public messageServiceUtils: MessageServiceUtils;

  constructor(
    protected store: Store<fromRoot.State>,
    protected resources: AppResource,
    protected messageService: MessageService,
  ) {
    this.resource = resources['resource'];
    this.messageServiceUtils = new MessageServiceUtils(
      messageService,
      this.resource,
    );
  }

  ngOnInit() {}

  static redirectToAuthentification(
    store: Store<fromRoot.State>,
    router: Router,
    url?: string,
  ) {
    store.dispatch({ type: '[Auth] Logout' });

    if (url) {
      store.dispatch({ type: '[Router] Go', payload: { path: [url] } });
    }

    router.navigate(['authentification']);
  }
}
