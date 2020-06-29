import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

@Injectable()
export class NewsApiService {

  api_key = '698a875ec66943b6b53ce5c1eeb7370d';
  favoriteArticles: any[] = [];

  constructor(private http: HttpClient) { }
  initSources(){
     return this.http.get('https://newsapi.org/v2/sources?country=ca&language=en&apiKey='+this.api_key);
  }

  initArticles(sources, category, page, pageSize){
   console.log('Source : ' + sources + ' Category : ' + category);
   let url = 'https://newsapi.org/v2/top-headlines?sources=' + sources +
             '&apiKey=' + this.api_key +
             '&page=' + page +
             '&pageSize=' + pageSize;
   if (category) {
    url = url + '&q=' + category;
   }
   return this.http.get(url);
  }

  getArticlesByID(source: String){
   return this.http.get('https://newsapi.org/v2/top-headlines?sources='+source+'&apiKey='+this.api_key);
  }

  addToFavoriteArticle(article: any) {
    this.favoriteArticles.push(article);
  }

  removeFromFavoriteArticle(article: any) {
    this.favoriteArticles.splice(this.favoriteArticles.indexOf(article));
  }
}

