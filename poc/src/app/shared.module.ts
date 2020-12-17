import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MessageComponent } from './message/message.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatCardModule,
        MatButtonModule,
        ReactiveFormsModule,
        FormsModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        HttpClientModule,
        MatTableModule,
        MatDialogModule
    ],
    declarations: [MessageComponent],
    providers: [CookieService],
    exports: [
        CommonModule,
        RouterModule,
        MatCardModule,
        MatButtonModule,
        ReactiveFormsModule,
        FormsModule,
        MatSnackBarModule,
        MessageComponent,
        MatProgressSpinnerModule,
        HttpClientModule,
        MatTableModule,
        MatDialogModule
    ],
    bootstrap: []
})
export class SharedModule { }
