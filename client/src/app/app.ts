//import { Component, signal } from '@angular/core';

//@Component({
  //selector: 'app-root',
  //standalone: true,
  //imports: [],
  //templateUrl: './app.html',
  //styleUrls: []
//})
//export class App {
  //protected readonly title = signal('Standalone Template Works');
//}

// import { Component, inject, OnInit, signal } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [],
//   // ✅ Use inline template — no chance of resolution failure
//   template: `
//     <h1>{{ title() }}</h1>
//     <p>Dating App</p>
//   `,
//   styleUrls: ['./app.css']
// })
// export class App implements OnInit {
//   protected readonly title = signal('Client');

//   ngOnInit(): void {
//     console.log('App initialized');

//     const http = inject(HttpClient); // ✅ move here
//     http.get('https://localhost:5001/api/members').subscribe({
//       next: res => console.log(res),
//       error: err => console.error('API Error:', err)
//     });
//   }
// }

import { Component, OnInit, Signal, signal } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule], // ✅ Add this
  // template: `
  //   <h1>{{ title() }}</h1>
  //   <p>Dating App</p>
  // `,
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  protected readonly title = signal('Dating App');
  protected members = signal<any>([])

  constructor(private http: HttpClient) {}

  // ngOnInit(): void {
  //   console.log('App initialized');

  //   // this.http.get('https://localhost:5001/api/members').subscribe({
  //     this.http.get('http://localhost:5000/api/members').subscribe({

  //     // next: res => console.log(res),
  //     next:res => this.members.set(res),
  //     error: err => console.error('API Error:', err),
  //     complete: () => console.log('Completed the http request')
  //   });
  // }
  
  async ngOnInit() {
    this.members.set(await this.getMembers())
  }

   async getMembers() {
    try {
      return lastValueFrom(this.http.get('http://localhost:5000/api/members'))
      
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}







