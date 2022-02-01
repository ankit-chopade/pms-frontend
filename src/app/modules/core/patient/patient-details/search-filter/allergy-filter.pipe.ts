import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'allergyFilter'
})
export class AllergyFilterPipe implements PipeTransform {
  transform(inputList: any[], filterCondition: string): any {

    // let output:any[] = [];

    if (!filterCondition)

      return inputList;

    let output = inputList.filter(v => {

      if (!v) { return; }

      return v.toLowerCase().indexOf(filterCondition.toLowerCase()) != -1;

    })

    return output;

  }
}