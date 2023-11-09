import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable()
export class AppResource {
  private resource: any = null!;

  constructor(private http: HttpClient) {}

  public getResource(key: any){
    return this.resource[key];
  }

  public load(): Promise<void> {
    console.log('Entree dans Resource.Load');
    return new Promise<void>((resolve, reject) => {
        const request = this.http.get(`./locale/configuration.json`);
        if(request) {
            request.subscribe((response: any) => {
                this.resource = response;
                console.log('Resource.Load OK');
                resolve();
            });
        } else {
            console.error('Locale resource file "locale.json" is not valid');
            reject();
        }
    });
  }

}