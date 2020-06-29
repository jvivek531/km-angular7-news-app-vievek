import { Component, OnInit } from '@angular/core';
import { NewsApiService } from '../news-api.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  favoriteArticle: any[] = [];
  constructor(private newsapi: NewsApiService) {
  }

  ngOnInit() {
    this.favoriteArticle = this.newsapi.favoriteArticles;
  }

  unFavorite(articel: any) {
    this.newsapi.removeFromFavoriteArticle(articel);
  }
}
