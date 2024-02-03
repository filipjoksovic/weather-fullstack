import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { DataFormattingComponent } from './data-formatting.component';
import { UserStoreService } from '../../services/user.store.service';
import { DateFormatEnum } from '@core/models/date-format';
import { TimeFormatEnum } from '@core/models/time-format';

describe('DataFormattingComponent', () => {
  let spectator: Spectator<DataFormattingComponent>;
  const createComponent = createComponentFactory({
    component: DataFormattingComponent,
    imports: [ReactiveFormsModule, DropdownModule],
    providers: [UserStoreService],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create the component', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should update user settings when date format changes', () => {
    const userStore = spectator.inject(UserStoreService);
    const dateFormatControl =
      spectator.component.dataFormattingForm.controls.dateFormat;

    dateFormatControl.setValue(DateFormatEnum.LONG);

    expect(userStore.updateUserSettings).toHaveBeenCalledWith(
      'dateFormat',
      'YYYY-MM-DD'
    );
  });

  it('should update user settings when time format changes', () => {
    const userStore = spectator.inject(UserStoreService);
    const timeFormatControl =
      spectator.component.dataFormattingForm.controls.timeFormat;

    timeFormatControl.setValue(TimeFormatEnum.LONG);

    expect(userStore.updateUserSettings).toHaveBeenCalledWith(
      'timeFormat',
      'HH:mm'
    );
  });
});
