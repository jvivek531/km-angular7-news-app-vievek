import { Component, OnInit } from '@angular/core';
import { NewsApiService } from '../news-api.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sources: any[] = [];
  sourcesList: any[] = [];

  mArticles: Array<any>;
  mSources: Array<any>;

  categories = [
    { name: 'business', selected: false},
    { name: 'entertainment', selected: false},
    { name: 'general', selected: false},
    { name: 'health', selected: false},
    { name: 'science', selected: false},
    { name: 'sports', selected: false},
    { name: 'technology', selected: false}];
  selectedCategory = '';
  pageSize = 8;
  totalResults = 0;
  page = 0;

  constructor(private newsapi: NewsApiService) {
    console.log('app component constructor called');
  }

  ngOnInit() {
    this.loadSource();
  }

  private loadSource() {
    this.newsapi.initSources()
        .subscribe(
          (data: any) => {
            this.sources = [];
            this.sources.push(data.sources[0].id);
            this.sourcesList = data.sources;
            this.resetPage();
            this.loadArticles();
          },
          (error: any) => {
            console.log('Error in Init Sources : ' + JSON.stringify(error));
          }
        );
  }

  loadArticles() {
    this.newsapi.initArticles(this.sources.join(','), this.selectedCategory, (this.page + 1), this.pageSize)
        .subscribe(
          (data: any)  => {
            this.mArticles = data.articles;
            this.totalResults = data.totalResults;
          },
          (error: any) => {
            console.log('Error in load Articles : ' + JSON.stringify(error));
          }
        );
  }


  selectionChange() {
    this.mArticles = [];
    this.resetPage();
    this.loadArticles();
  }

  addToFavorite(article: any) {
    this.newsapi.addToFavoriteArticle(article);
  }

  changeSelected($event, category): void {
    category.selected = $event.selected;
    if (category.selected) {
      this.selectedCategory = category.name;
      this.resetPage();
      this.loadArticles();
    } else {
      if (this.selectedCategory === category.name) {
        this.selectedCategory = '';
        this.resetPage();
        this.loadArticles();
      }
    }
  }

  resetPage() {
    this.page = 0;
    this.totalResults = 0;
  }

  changePage(pageEvent: PageEvent) {
    this.page = pageEvent.pageIndex;
    this.loadArticles();
  }
}
