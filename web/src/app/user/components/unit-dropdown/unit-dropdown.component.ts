import { Component, EventEmitter, Input, Output } from '@angular/core';
import { getPercentageUnits } from '@core/models/api/response/percentage.unit';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-unit-dropdown',
  standalone: true,
  imports: [DropdownModule, FormsModule],
  templateUrl: './unit-dropdown.component.html',
})
export class UnitDropdownComponent {
  @Input({ required: true })
  public id!: string;

  @Input({ required: true })
  public label!: string;

  @Input({ required: true })
  public options!: string[];

  @Input({ required: true })
  public placeholder!: string;

  @Input({ required: true })
  public selectedValue!: string;

  @Output()
  public unitConfigured: EventEmitter<{ key: string; value: string }> =
    new EventEmitter<{ key: string; value: string }>();
  protected readonly getPercentageUnits = getPercentageUnits;

  dropdownChanged(event: DropdownChangeEvent) {
    this.unitConfigured.emit({ key: this.id, value: event.value });
  }
}
