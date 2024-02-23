import { Component } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { Router } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,  MatInputModule, MatFormFieldModule, MatButtonToggleModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private webs: WebsocketService, private router: Router) {
    !webs.isConnect() ? router.navigate(["start"]) : 0;
  }
  ngOnInit() {
    this.webs.on("refreshRooms", (e: any) => {this.rooms = e, console.log(e);
    });
    this.webs.emit("getLobbys", undefined);
    this.webs.on("statusCreate", (e: any) => {alert(e)});
    this.webs.on("statusDelete", (e: any) => {alert(e)});
    // statusCreate
  }
  nickname: string = localStorage.getItem("nickname") as string;
  rooms: refreshRooms[] = []
  changeNickname() {
    this.router.navigate(["start"])
  }
  ///
  creating: boolean = false;
  create(
    // name: string,
     max: number) {
    const tmp: createRoom = {
      name: "Комната " + this.nickname,
      max: Number(max)
    }
    this.webs.emit("createLobby", tmp);
    this.creating = false;
  }
  deleteR(name: string,) {
    this.webs.emit("deleteLobby", name);
  }
}

interface refreshRooms {
  name: string,
  creator: boolean,
  players: string[],
  maxPlayers: number,
  canIn: boolean
}

interface createRoom {
  name: string
  max: number
}
