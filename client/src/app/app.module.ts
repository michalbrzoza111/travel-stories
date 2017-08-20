import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { UserService } from './services/user.service'; // MOCK SERVICE FOR TESTING ONLY
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { WallComponent } from './components/wall/wall.component';
import { ExploreComponent } from './components/explore/explore.component';
import { CommentsComponent } from './components/shared/comments/comments.component';
import { SettingsComponent } from './components/settings/settings.component';
import { EditPasswordComponent } from './components/settings/edit-password/edit-password.component';
import { EditProfileComponent } from './components/settings/edit-profile/edit-profile.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserDataService } from './components/user-profile/user-data.service';
import { UserPostDialogComponent } from './components/user-profile/user-post-dialog/user-post-dialog.component';
import { WallCardComponent } from './components/wall/wall-card/wall-card.component';
import { ExploreCardComponent } from './components/explore/explore-card/explore-card.component';
import { FooterComponent } from './components/footer/footer.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

//angular filestack
import { FilePickerModule } from 'angular-file-picker';

// Material Design
import { MdCardModule } from '@angular/material';
import { MdSidenavModule } from '@angular/material';
import { MdMenuModule } from '@angular/material';
import { MdToolbarModule} from '@angular/material';
import { MdDialogModule, MdDialogRef } from '@angular/material';
//materialize
import { MaterializeModule } from 'angular2-materialize';
import { GroupComponent } from './components/shared/group/group.component';
import { CommentComponent } from './components/shared/comments/comment/comment.component';
import { UserPostComponent } from './components/user-profile/user-post/user-post.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },

  { path: 'wall', component: WallComponent, canActivate: [AuthGuard]  },
  { path: 'explore', component: ExploreComponent, canActivate: [AuthGuard]  },
  // { path: 'profile/:id', component: UserProfileComponent },
  { path: ':username', component: UserProfileComponent, canActivate: [AuthGuard]  },
  { path: 'settings/:id', component: SettingsComponent, canActivate: [AuthGuard]  },
  { path: 'post/:username/:postId', component: UserPostComponent, canActivate: [AuthGuard]  },
  //  { path: 'profile', component: UserProfileComponent },

  // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  // { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
]

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    WallComponent,
    ExploreComponent,
    CommentsComponent,
    SettingsComponent,
    EditPasswordComponent,
    EditProfileComponent,
    UserProfileComponent,
    UserPostDialogComponent,
    WallCardComponent,
    ExploreCardComponent,
    FooterComponent,
    GroupComponent,
    CommentComponent,
    UserPostComponent
  ],
  entryComponents: [
    UserPostDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MdCardModule,
    MaterializeModule,
    MdSidenavModule,
    MdMenuModule,
    MdToolbarModule,
    FilePickerModule,
    MdDialogModule
  ],
  providers: [ValidateService, AuthService, UsersService, UserService, UserDataService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
