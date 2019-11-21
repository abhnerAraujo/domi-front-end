import { BsNavegacaoLink } from './../../interfaces/bs-navegacao-link.interface';
import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

@Component({
  selector: 'app-bottom-sheet-navegacao',
  templateUrl: './bottom-sheet-navegacao.component.html',
  styleUrls: ['./bottom-sheet-navegacao.component.scss']
})
export class BottomSheetNavegacaoComponent implements OnInit {

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: BsNavegacaoLink[],
    public bottomSheetRef: MatBottomSheetRef<BottomSheetNavegacaoComponent>) { }

  ngOnInit() {
  }

}
