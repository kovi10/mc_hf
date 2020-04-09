import { OutgoingPacket, InboxDto, IncomingPacket } from './chat'
import { EventProducer } from './EventProducer';
import { ProxyEventMap } from './EventMap';


export class Proxy extends EventProducer<ProxyEventMap> {
    private ws: WebSocket;

    inbox: InboxDto | null = null;

    constructor() {
        super(); //
        //this.ws = new WebSocket("ws://echo.websocket.org/");
        this.ws = new WebSocket("wss://raja.aut.bme.hu/chat/");
        this.ws.addEventListener("open", () => {
            //this.sendPacket({type: "register", email: "kovagomate.email@gmail.com", password: "asd", displayName: "Mate", staySignedIn: false});
            //this.sendPacket({type: "login", email: "kovagomate.email@gmail.com", password: "asd", staySignedIn: false});
            
            //this.ws.send("Hello");
        });
        this.ws.addEventListener("message", e => {
            //console.log("Hello");
            console.log(e.data); //
            let p = <IncomingPacket>JSON.parse(e.data);
            switch (p.type) {
                case "error":
                    alert(p.message);
                    break;
                case "login":
                    this.inbox = p.inbox;
                    this.dispatch("login");
                    break;
                case "message":
                    let cid = p.channelId;
                    this.inbox!.conversations.find(x => x.channelId === cid)?.lastMessages.push(p.message);
                    this.dispatch( "message", cid, p.message );
                    break;
                case "conversationAdded":
                    this.inbox!.conversations.push(p.conversation);
                    this.dispatch( "conversation", p.conversation.channelId );
                    break;
            }
        });
    }

    sendPacket(packet: OutgoingPacket) {
        this.ws.send(JSON.stringify(packet));
    }
}

export var proxy = new Proxy();