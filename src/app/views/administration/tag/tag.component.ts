import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Tag } from 'src/app/api/models/interface/concretes/tag.interface';
import { GeneriqueService } from 'src/app/api/services/generique.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  standalone: true,
  providers: [GeneriqueService, { provide: 'collectionName', useValue: 'tags' }]
})
export class TagComponent implements OnInit {
  tags: Tag[] = [];
  tagSubscription!: Subscription;

  constructor(private _generiqueService: GeneriqueService<Tag>) { 
    this.tagSubscription = this._generiqueService.subject.subscribe((tags: Tag[]) => {
      this.tags = tags;
    });
  }

  ngOnInit() {
    console.log(this.tags);
  }
}
