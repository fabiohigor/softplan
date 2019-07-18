import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminLayoutRoutes} from './admin-layout.routing';
import {DashboardComponent} from '../../dashboard/dashboard.component';
import {UserProfileComponent} from '../../user-profile/user-profile.component';
import {TableListComponent} from '../../table-list/table-list.component';
import {TypographyComponent} from '../../typography/typography.component';
import {IconsComponent} from '../../icons/icons.component';
import {MapsComponent} from '../../maps/maps.component';
import {NotificationsComponent} from '../../notifications/notifications.component';
import {UpgradeComponent} from '../../upgrade/upgrade.component';

import {MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule, MatTooltipModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {ListarComponent} from '../../pessoa/listar/listar.component';
import {SalvarComponent} from '../../pessoa/salvar/salvar.component';
import {MatMomentDateModule} from '@angular/material-moment-adapter';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatDatepickerModule,
        MatMomentDateModule,
    ],
    declarations: [
        DashboardComponent,
        UserProfileComponent,
        TableListComponent,
        TypographyComponent,
        IconsComponent,
        MapsComponent,
        NotificationsComponent,
        UpgradeComponent,
        ListarComponent,
        SalvarComponent,
    ]
})

export class AdminLayoutModule {
}

