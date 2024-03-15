import { Injectable } from '@angular/core';
import { environnement } from '../../../environnement';
import { HttpClient } from '@angular/common/http';
import { Tag } from '../../model/planner/tag.model';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { ResponseObject } from '../../model/response/responseObjectDto.model';
import { ResponseDto } from '../../model/response/responseDto.model';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  url: string = environnement.backEndUrl + 'task/utils/'
  $tags = new BehaviorSubject<Tag[]>([])

  constructor(private http: HttpClient) { }

  private createTag(tag: Tag): Observable<ResponseObject<Tag>>{
    return this.http.post<ResponseObject<Tag>>(this.url + 'create/tag', tag)
  }

  private deleteTag(id: number):Observable<ResponseDto>{
    return this.http.get<ResponseDto>(this.url + 'delete/tag/' + id)
  }

  private updateTag(tag: Tag): Observable<ResponseObject<Tag>>{
    return this.http.post<ResponseObject<Tag>>(this.url + 'update/tag', tag)
  }

  private getAllTags(): Observable<ResponseObject<Tag[]>>{
    return this.http.get<ResponseObject<Tag[]>>(this.url + 'read/tags')
  }
  
  public newTag(tag: Tag): Observable<ResponseObject<Tag>>{
    let tags: Tag[] = this.$tags.value
    return this.createTag(tag).pipe(
      tap(data => {
        let tag = data.object
        tags.push(tag)
        this.$tags.next(tags)
      })
    )
  }

  public init(){
    let tags: Tag[] = this.$tags.value
    if(tags != null && tags.length > 0){
      this.$tags.next(tags)
    }else{
      this.getAllTags().subscribe(data => { 
        if(data.responseDto.executionStatus)
        this.$tags.next(data.object)
      })
    }
  }

  public update(tag: Tag): Observable<ResponseObject<Tag>>{
    let tags: Tag[] = this.$tags.value
    return this.updateTag(tag).pipe(
      tap(data => {
        let tag = data.object
        tags.push(tag)
        this.$tags.next(tags)
      })
    )
  }

  public delete(id: number):Observable<ResponseDto>{
    let tags: Tag[] = this.$tags.value
    return this.deleteTag(id).pipe(tap(data => {
      if(data.executionStatus){
        this.$tags.next(tags.filter(item => item.tagId != id))
      }
    }))
  }


}
