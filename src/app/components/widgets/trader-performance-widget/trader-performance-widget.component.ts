import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TraderModel } from 'src/app/services/repository/trade-repository/models/trader.model';
import { TradeRepositoryService } from 'src/app/services/repository/trade-repository/trade-repository.service';

@Component({
  selector: 'app-trader-performance-widget',
  templateUrl: './trader-performance-widget.component.html',
  styleUrls: ['./trader-performance-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TraderPerformanceWidgetComponent implements OnInit {

  traders: TraderModel[] = [];
  constructor(
    private readonly tradeRepository: TradeRepositoryService,
    private readonly ref: ChangeDetectorRef
    ) { }

  ngOnInit(): void {
    this.tradeRepository.getBestPerformingTraders(undefined, undefined, 3).subscribe(result => {
      this.traders = result;
      this.ref.detectChanges();
    })
  }

}
