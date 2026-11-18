// Simulating TCP 3-Way Handshake in JavaScript (for understanding)

// Sequence numbers for both sides
let yourSeq = 1000;    // Your packets will start from 1000
let serverSeq = 5000;  // Server's packets will start from 5000

// STEP 1: SYN (You → Server)
function sendSYN() {
    console.log("STEP 1: SYN");
    console.log(`  You → Server: "Are you there? I'll start from ${yourSeq}"`);
    console.log(`  Packet: { type: 'SYN', seq: ${yourSeq} }`);
    return true; // Server receives it
}

// STEP 2: SYN-ACK (Server → You)
function sendSYNACK() {
    console.log("\nSTEP 2: SYN-ACK");
    console.log(`  Server → You: "Yes! I got your ${yourSeq}. Send ${yourSeq + 1} next."`);
    console.log(`  Server → You: "I'll start from ${serverSeq}."`);
    console.log(`  Packet: { type: 'SYN-ACK', ack: ${yourSeq + 1}, seq: ${serverSeq} }`);
    return true; // You receive it
}

// STEP 3: ACK (You → Server)
function sendACK() {
    console.log("\nSTEP 3: ACK");
    console.log(`  You → Server: "I heard you! I got your ${serverSeq}. Send ${serverSeq + 1} next."`);
    console.log(`  Packet: { type: 'ACK', ack: ${serverSeq + 1} }`);
    return true; // Server receives it
}

// Execute the handshake
function tcpHandshake() {
    console.log("=== TCP 3-WAY HANDSHAKE ===\n");
    
    const synReceived = sendSYN();
    // THINK: We sent SYN. Server is alive? We'll know when we get a reply.
    
    const synAckReceived = sendSYNACK();
    // THINK: We got SYN-ACK. This proves:
    // 1. Server is alive (it replied)
    // 2. Server → You direction works (we received its reply)
    // 3. You → Server direction works (server received our SYN)
    
    const ackReceived = sendACK();
    // THINK: We sent ACK. Now server knows we received its SYN-ACK.
    // This confirms the Server → You direction works for the server too.
    
    console.log("\n✅ Both directions confirmed!");
    console.log("✅ Connection established!");
    console.log("✅ Ready to send 100 packets of data.");
}

tcpHandshake();