import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent {
  imgvar:number=1;
changeimg()
{
  this.imgvar = (Math.floor(Math.random() * 3) + 1)
}
//img var

ngOnInit() 
{
  //change image of card
  this.changeimg();
   setInterval(() => {this.changeimg();}, 3000);
}
  
}
