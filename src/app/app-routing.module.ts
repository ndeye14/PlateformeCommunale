import { GestionBienComponent } from './admin/gestion-bien/gestion-bien.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { GestionProduitComponent } from './admin/gestion-produit/gestion-produit.component';
import { GestionAnnuaireComponent } from './admin/gestion-annuaire/gestion-annuaire.component';
import { AuthenComponent } from './auth/authen/authen.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { MessageComponent } from './admin/message/message.component';
import { DetailAnnonceComponent } from './detail-annonce/detail-annonce.component';
import { PolitiqueComponent } from './politique/politique.component';
import { ConditionComponent } from './condition/condition.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { ProfilComponent } from './profil/profil.component';
import { EspacePersoComponent } from './utilisateur/espace-perso/espace-perso.component';

const routes: Routes = [
  { path: '', redirectTo: '/acceuil', pathMatch: 'full' },
  {
    path: 'dash',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'acceuil',
    component: AcceuilComponent,
  },
  {
    path: 'politique',
    component: PolitiqueComponent,
  },
  {
    path: 'condition',
    component: ConditionComponent,
  },
  {
    path: 'auth',
    component: AuthenComponent,
  },
  {
    path: 'espacePerso',
    component: EspacePersoComponent,
  },
  {
    path: 'ressource',
    component: RessourcesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'annuaire',
    component: AnnuairesComponent,
  },
  {
    path: 'entete',
    component: HeaderComponent,
  },
  {
    path: 'footer',
    component: FooterComponent,
  },
  {
    path: 'galerie',
    component: GalerieComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'detailRessource/:id',

    component: DetailRessourceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'maketplace',
    component: MaketplaceComponent,
  },
  {
    path: 'bien',
    component: BienPerduRetrouveComponent,
  },
  {
    path: 'annonce',
    component: AnnonceComponent,
  },
  {
    path: 'detailAnnonce/:id',
    component: DetailAnnonceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },

  // chemin admin
  {
    path: 'gestion-annonce',
    component: GestionAnnonceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'gestion-ressource',
    component: GestionRessourceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'gestion-commentaire',
    component: GestionCommentaireComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'gestion-annuaire',
    component: GestionAnnuaireComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'gestion-bien',
    component: GestionBienComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'gestion-produit',
    component: GestionProduitComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'message',
    component: MessageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profil',
    component: ProfilComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: MaintenanceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
