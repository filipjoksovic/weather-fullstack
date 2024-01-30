import { Injectable } from '@angular/core';
import { UserData } from '../../models/user-data.model';
import { HttpClient } from '@angular/common/http';
import { UserReqDto } from '../../models/api/userReqDto';
import { UserResDto } from '../../models/api/user-res.dto';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private readonly http: HttpClient) {}

  public updateUser(userId: string, request: Partial<UserReqDto>) {
    return this.http.patch<UserResDto>(
      `http://localhost:8080/api/users/${userId}`,
      request
    );
  }
}
