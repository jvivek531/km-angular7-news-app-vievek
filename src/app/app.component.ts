import { Component, OnInit } from '@angular/core';
import { NewsApiService } from './news-api.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private newsapi: NewsApiService) {
    console.log('app component constructor called');
  }
  ngOnInit() {
  }
}
