import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class WeatherService {

  constructor( private http:Http) { }



getWeather(){

  let headers = new Headers();
  headers.append('Content-type','text/plain');
  return this.http.get('http://api.openweathermap.org/data/2.5/weather?q=Edmonton&units=metric&appid=5b7c86fa150a8f12114a0b03aa96f577',{headers:headers})
.map(res=> 
res.json())
  
}
getTime(){

  let headers = new Headers();
  headers.append('Content-type','text/plain');
  return this.http.get('https://maps.googleapis.com/maps/api/timezone/json?location=49.283436, -123.130429&timestamp=1478880000&key=AIzaSyBNmhC72vDhVZKckWncXqrkxlhOQd89UW4',{headers:headers})
.map(res=>
res.json())
  
}


}

