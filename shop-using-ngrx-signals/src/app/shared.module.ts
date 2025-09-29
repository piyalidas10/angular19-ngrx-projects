import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";

const modules = [
    CommonModule, 
    FormsModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule
];

@NgModule({
    imports: modules,
    exports: modules    
})
export class SharedModule {}