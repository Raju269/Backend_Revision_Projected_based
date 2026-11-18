// Simulating packet sending with acknowledgments

class PacketSender {
    constructor() {
        this.sequenceNumber = 1001; // Starting sequence number
        this.packetsSent = [];
        this.acknowledged = new Set();
        this.timerMap = new Map();
    }

    // Send a packet and start a timer
    sendPacket(data, seqNum) {
        console.log(`📤 Sending Packet ${seqNum}: "${data}"`);
        this.packetsSent.push(seqNum);
        
        // THINK: Every packet has a timer
        // If ACK doesn't come back before timer expires → resend
        this.startTimer(seqNum, data);
    }

    // Timer for each packet
    startTimer(seqNum, data) {
        // Simulate timer with setTimeout
        const timer = setTimeout(() => {
            // THINK: Timer expired without ACK
            if (!this.acknowledged.has(seqNum)) {
                console.log(`⏰ Timer expired for Packet ${seqNum}. NO ACK received.`);
                console.log(`🔄 RESENDING Packet ${seqNum}`);
                this.sendPacket(data, seqNum);
            }
        }, 1000); // 1 second timer
        
        this.timerMap.set(seqNum, timer);
    }

    // Server acknowledges a packet
    receiveACK(ackNum) {
        // THINK: ACK 1002 means "I got 1001, send 1002"
        const packetNum = ackNum - 1;
        console.log(`✅ ACK received: "Got ${packetNum}. Send ${ackNum}."`);
        this.acknowledged.add(packetNum);
        clearTimeout(this.timerMap.get(packetNum));
    }

    // Simulate out-of-order packets
    bufferAndReorder() {
        console.log("\n📦 Out-of-order handling:");
        console.log("  Server receives: 1001, 1003, 1002");
        console.log("  Buffer: [1003] — waiting for 1002");
        console.log("  When 1002 arrives: 1001 → 1002 → 1003 → correct order");
    }
}

// Demo
const sender = new PacketSender();
sender.sendPacket("first chunk", 1001);
sender.receiveACK(1002); // Server got 1001
sender.sendPacket("second chunk", 1002);
sender.receiveACK(1003); // Server got 1002
sender.sendPacket("third chunk", 1003);
sender.receiveACK(1004); // Server got 1003
sender.bufferAndReorder();