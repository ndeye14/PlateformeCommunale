import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Add this import


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { RessourcesComponent } from './ressources/ressources.component';
import { AnnuairesComponent } from './annuaires/annuaires.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GalerieComponent } from './galerie/galerie.component';
import { ContactComponent } from './contact/contact.component';
import { DetailRessourceComponent } from './detail-ressource/detail-ressource.component';
import { MaketplaceComponent } from './maketplace/maketplace.component';
import { BienPerduRetrouveComponent } from './bien-perdu-retrouve/bien-perdu-retrouve.component';
import { AnnonceComponent } from './annonce/annonce.component';
import { GestionAnnonceComponent } from './admin/gestion-annonce/gestion-annonce.component';
import { GestionRessourceComponent } from './admin/gestion-ressource/gestion-ressource.component';
import { GestionCommentaireComponent } from './admin/gestion-commentaire/gestion-commentaire.component';
import { GestionAnnuaireComponent } from './admin/gestion-annuaire/gestion-annuaire.component';
import { GestionBienComponent } from './admin/gestion-bien/gestion-bien.component';
import { GestionProduitComponent } from './admin/gestion-produit/gestion-produit.component';

import { DataTablesModule } from 'angular-datatables';
import { AuthenComponent } from './auth/authen/authen.component';
import { LoginComponent } from './auth/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { MessageComponent } from './admin/message/message.component';
import { DetailAnnonceComponent } from './detail-annonce/detail-annonce.component';
import { PolitiqueComponent } from './politique/politique.component';
import { ConditionComponent } from './condition/condition.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { ProfilComponent } from './profil/profil.component';
import { EspacePersoComponent } from './utilisateur/espace-perso/espace-perso.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AcceuilComponent,

    RessourcesComponent,
    AnnuairesComponent,
    HeaderComponent,
    FooterComponent,
    GalerieComponent,
    ContactComponent,
    DetailRessourceComponent,
    MaketplaceComponent,
    BienPerduRetrouveComponent,
    AnnonceComponent,
    GestionAnnonceComponent,
    GestionRessourceComponent,
    GestionCommentaireComponent,
    GestionAnnuaireComponent,
    GestionBienComponent,
    GestionProduitComponent,
    AuthenComponent,
    LoginComponent,
    MessageComponent,
    DetailAnnonceComponent,
    PolitiqueComponent,
    ConditionComponent,
    MaintenanceComponent,
    ProfilComponent,
    EspacePersoComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
