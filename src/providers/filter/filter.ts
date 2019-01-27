import { Injectable } from '@angular/core';


@Injectable()
export class FilterProvider {

  restaurant_list:any = [];
  cheap_checkbox_option:boolean = false;
  mid_range_checkbox_option:boolean = false;
  fine_dining_checkbox_option:boolean = false;
  open_now_checkbox_option:boolean = false;
  take_out_checkbox_option:boolean = false;
  cuisine_type:any[] = [];

  constructor() {
  }

  setFilters(b,c,d,e,f,g){
    this.cheap_checkbox_option = b;
    this.mid_range_checkbox_option = c;
    this.fine_dining_checkbox_option = d;
    this.open_now_checkbox_option = e;
    this.take_out_checkbox_option = f;
    this.cuisine_type = g;
  }

  getFilters(){
    return {
      restaurant_list : this.restaurant_list,
      cheap_checkbox_option : this.cheap_checkbox_option,
      mid_range_checkbox_option : this.mid_range_checkbox_option,
      fine_dining_checkbox_option: this.fine_dining_checkbox_option,
      open_now_checkbox_option : this.open_now_checkbox_option,
      take_out_checkbox_option : this.take_out_checkbox_option,
      cuisine_type : this.cuisine_type
    }
  }

}
