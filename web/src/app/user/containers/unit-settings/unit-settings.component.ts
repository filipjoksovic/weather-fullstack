import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { getPercentageUnits } from '@core/models/api/response/percentage.unit';
import { getDirectionUnits } from '@core/models/api/response/direction.unit';
import { getPressureUnits } from '@core/models/api/response/pressure.unit';
import { getSpeedUnits } from '@core/models/api/response/speed.unit';
import { getTemperatureUnits } from '@core/models/api/response/temperature.unit';
import { DropdownModule } from 'primeng/dropdown';
import { UnitDropdownComponent } from '../../components/unit-dropdown/unit-dropdown.component';
import { getHeightUnits } from '@core/models/api/response/height.unit';
import { DividerModule } from 'primeng/divider';
import { UserStoreService } from '../../services/user.store.service';

@Component({
  selector: 'app-unit-settings',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    InputTextModule,
    DropdownModule,
    UnitDropdownComponent,
    DividerModule,
  ],
  templateUrl: './unit-settings.component.html',
  styleUrl: './unit-settings.component.scss',
})
export class UnitSettingsComponent {
  protected readonly getPercentageUnits = getPercentageUnits;
  protected readonly getDirectionUnits = getDirectionUnits;
  protected readonly getPressureUnits = getPressureUnits;
  protected readonly getSpeedUnits = getSpeedUnits;
  protected readonly getTemperatureUnits = getTemperatureUnits;
  protected readonly getHeightUnits = getHeightUnits;

  private readonly userStore = inject(UserStoreService);

  public user = this.userStore.user;

  public unitConfigured(event: { key: string; value: string }) {
    this.userStore.updateUserUnitSettings(event.key, event.value);
  }
}
