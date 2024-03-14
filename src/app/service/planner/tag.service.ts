import { Injectable } from '@angular/core';
import { environnement } from '../../../environnement';
import { HttpClient } from '@angular/common/http';
import { Tag } from '../../model/planner/tag.model';
import { Observable, of, tap } from 'rxjs';
import { ResponseObject } from '../../model/response/responseObject.model';
import { CacheService } from '../cache.service';
import { Response } from '../../model/response/response.model';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  url: string = environnement.backEndUrl + 'task/utils/'
  cacheName: string = 'tag'
  
  constructor(private http: HttpClient, private _cacheService: CacheService) { }

  private createTag(tag: Tag): Observable<ResponseObject<Tag>>{
    return this.http.post<ResponseObject<Tag>>(this.url + 'create/tag', tag)
  }

  private deleteTag(id: number):Observable<Response>{
    return this.http.get<Response>(this.url + 'delete/tag/' + id)
  }

  private updateTag(tag: Tag): Observable<ResponseObject<Tag>>{
    return this.http.post<ResponseObject<Tag>>(this.url + 'update/tag', tag)
  }

  private getAllTags(): Observable<ResponseObject<Tag[]>>{
    return this.http.get<ResponseObject<Tag[]>>(this.url + 'read/tags')
  }
  
  public newTag(tag: Tag): Observable<ResponseObject<Tag>>{
    let tags: Tag[] = this._cacheService.get(this.cacheName)
    return this.createTag(tag).pipe(
      tap(data => {
        let tag = data.object
        tags.push(tag)
        this.updateCache(tags)
      })
    )
  }

  public getAll(): Observable<ResponseObject<Tag[]>>{
    let tag: Tag[] = this._cacheService.get(this.cacheName)
    if(tag != null && tag.length > 0) return of(new ResponseObject(new Response("", true), tag))
    return this.getAllTags()
  }

  public update(tag: Tag): Observable<ResponseObject<Tag>>{
    let tags: Tag[] = this._cacheService.get(this.cacheName)
    return this.updateTag(tag).pipe(
      tap(data => {
        let tag = data.object
        tags.push(tag)
        this.updateCache(tags)
      })
    )
  }

  public delete(id: number):Observable<Response>{
    let tags: Tag[] = this._cacheService.get(this.cacheName)
    return this.deleteTag(id).pipe(tap(data => {
      if(data.executionStatus){
        tags.filter(item => item.tagId != id)
        this.updateCache(tags)
      }
    }))
  }

  private updateCache(tags: Tag[]){
    this._cacheService.clear(this.cacheName)
    this._cacheService.set(this.cacheName, tags)
  }

}
