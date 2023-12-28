import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'iconify',
  templateUrl: './iconify.component.html',
  styleUrls: ['./iconify.component.scss']
})
export class IconifyComponent implements OnInit{

  @Input() icon: string;
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' = 'sm';
  @Input() customSize: number;

  @Input() rotating = false;

  styles: string;

  ngOnInit(): void {
    switch (this.size) {
      case "lg":
        this.styles = "font-size: 34px;"
        break;
      case "xs":
        this.styles = "font-size: 16px;"
        break;
      case "sm":
        this.styles = "font-size: 22px;"
        break;
      default:
        this.styles = "font-size: 28px;"
        break;
    }

    if (this.customSize){
      this.styles = `font-size: ${this.customSize}px;`
    }

  }



}
