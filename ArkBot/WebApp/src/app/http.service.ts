import { Injectable }    from '@angular/core';
import { Headers, Http, RequestOptions  } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { environment } from '../environments/environment';
import { Servers } from './servers';
import { Player } from './player';

@Injectable()
export class HttpService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private serversUrl = '/servers';
  private serverUrl = '/server';
  private structuresUrl = '/structures';
  private adminServerUrl = '/adminserver';
  private administerUrl = '/administer';
  private playerUrl = '/player';
  private options: RequestOptions = new RequestOptions({ withCredentials: true });

  constructor(private http: Http) { }

  getServers(): Promise<Servers> {
    return this.http.get(`${this.getApiBaseUrl()}${this.serversUrl}?t=${+new Date()}`, this.options)
               .toPromise()
               .then(response => response.json() as Servers)
               .catch(this.handleError);
  }

  getServer(serverKey: string): Promise<any> {
    return this.http.get(`${this.getApiBaseUrl()}${this.serverUrl}/${serverKey}?t=${+new Date()}`, this.options)
               .toPromise()
               .then(response => response.json() as any)
               .catch(this.handleError);
  }

  getStructures(serverKey: string): Promise<any> {
    return this.http.get(`${this.getApiBaseUrl()}${this.structuresUrl}/${serverKey}?t=${+new Date()}`, this.options)
               .toPromise()
               .then(response => response.json() as any)
               .catch(this.handleError);
  }

  getPlayer(steamId: string): Promise<Player> {
    return this.http.get(`${this.getApiBaseUrl()}${this.playerUrl}/${steamId}?t=${+new Date()}`, this.options)
               .toPromise()
               .then(response => response.json() as Player)
               .catch(this.handleError);
  }

  getAdminServer(serverKey: string): Promise<any> {
    return this.http.get(`${this.getApiBaseUrl()}${this.adminServerUrl}/${serverKey}?t=${+new Date()}`, this.options)
               .toPromise()
               .then(response => response.json() as any)
               .catch(this.handleError);
  }

  adminDestroyAllStructuresForTeamId(serverKey: string, teamId: string): Promise<any> {
    return this.http.get(`${this.getApiBaseUrl()}${this.administerUrl}/DestroyAllStructuresForTeamId/${serverKey}?teamId=${teamId}&t=${+new Date()}`, this.options)
               .toPromise()
               .then(response => response.json() as any)
               .catch(this.handleError);
  }

  adminDestroyStructuresForTeamIdAtPosition(serverKey: string, teamId: string, x: number, y: number, radius: number, rafts: number): Promise<any> {
    return this.http.get(`${this.getApiBaseUrl()}${this.administerUrl}/DestroyStructuresForTeamIdAtPosition/${serverKey}?teamId=${teamId}&x=${x}&y=${y}&radius=${radius}&rafts=${rafts}&t=${+new Date()}`, this.options)
               .toPromise()
               .then(response => response.json() as any)
               .catch(this.handleError);
  }

  adminDestroyDinosForTeamId(serverKey: string, teamId: string): Promise<any> {
    return this.http.get(`${this.getApiBaseUrl()}${this.administerUrl}/DestroyDinosForTeamId/${serverKey}?teamId=${teamId}&t=${+new Date()}`, this.options)
               .toPromise()
               .then(response => response.json() as any)
               .catch(this.handleError);
  }

  adminSaveWorld(serverKey: string): Promise<any> {
    return this.http.get(`${this.getApiBaseUrl()}${this.administerUrl}/SaveWorld/${serverKey}?t=${+new Date()}`, this.options)
               .toPromise()
               .then(response => response.json() as any)
               .catch(this.handleError);
  }

  getApiBaseUrl(): string {
    return environment.apiBaseUrl.replace(/\<protocol\>/gi, window.location.protocol).replace(/\<hostname\>/gi, window.location.hostname);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}