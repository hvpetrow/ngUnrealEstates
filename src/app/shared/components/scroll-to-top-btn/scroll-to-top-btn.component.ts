import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top-btn',
  templateUrl: './scroll-to-top-btn.component.html',
  styleUrls: ['./scroll-to-top-btn.component.css']
})
export class ScrollToTopBtnComponent implements OnInit {
  visible: boolean = false;

  constructor() { }


  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      this.visible = window.pageYOffset > 300;
    });
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  }
}
