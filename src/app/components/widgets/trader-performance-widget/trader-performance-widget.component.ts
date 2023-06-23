import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TradeRepositoryService } from 'src/app/services/repository/trade-repository/trade-repository.service';

@Component({
  selector: 'app-trader-performance-widget',
  templateUrl: './trader-performance-widget.component.html',
  styleUrls: ['./trader-performance-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TraderPerformanceWidgetComponent implements OnInit {

  constructor(private readonly tradeRepository: TradeRepositoryService) { }

  ngOnInit(): void {
    this.tradeRepository.getBestPerformingTraders(undefined, undefined, 3).subscribe(result => {
      console.log(result);
    })
  }

}
