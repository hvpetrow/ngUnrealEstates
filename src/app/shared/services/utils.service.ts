import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IEstate } from '../estate';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  showErrorInControl(controlName: string, sourceGroup: FormGroup) {
    return sourceGroup.controls[controlName].touched && sourceGroup.controls[controlName].invalid;
  }

  timeAgoHandler(value: any) {
    const now = new Date();
    const then = new Date(value);

    const timePassed = now.getTime() - then.getTime();
    const miliseconds = 1000;
    const second = miliseconds;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = day * 365;

    if (timePassed < minute) {
      if (timePassed / second < 2) {
        return `now`;
      } else {
        return `a few seconds ago`;
      }
    }

    if (timePassed < hour) {
      if (timePassed / minute < 2) {
        return `${Math.floor(timePassed / minute)} minute ago`;
      } else {
        return `${Math.floor(timePassed / minute)} minutes ago`;
      }
    }

    if (timePassed < day) {
      if (timePassed / hour < 2) {
        return `${Math.floor(timePassed / hour)} hour ago`;
      } else {
        return `${Math.floor(timePassed / hour)} hours ago`;
      }
    }

    if (timePassed < month) {
      if (timePassed / day < 2) {
        return `${Math.floor(timePassed / day)} day ago`;
      } else {
        return `${Math.floor(timePassed / day)} days ago`;
      }
    }

    if (timePassed < year) {
      if (timePassed / month < 2) {
        return `${Math.floor(timePassed / month)} month ago`;
      } else {
        return `${Math.floor(timePassed / month)} months ago`;
      }
    }

    if (timePassed / year < 2) {
      return `${Math.floor(timePassed / year)} year ago`;
    } else {
      return `${Math.floor(timePassed / year)} years ago`;
    }

  }

  filterSearchResults(allEstates: IEstate[], searchedValue: string, searchType: string) {
    let result;

    if (searchType === 'Name') {
      result = allEstates.filter(x => x.name.toLowerCase().includes(searchedValue.toLowerCase()));
    } else if (searchType === 'Location') {
      result = allEstates.filter(x => x.location.toLowerCase().includes(searchedValue.toLowerCase()));
    }


    return result;
  };
}
