let timer = null, monitorCpu = null, monitorNet = null;
let seconds = 0;
const rate = 0.000110; // ¥0.397/hr ÷ 3600
let cpuPeak = 0;

function randomId() {
return Math.random().toString(36).substr(2,15);
}

function formatTime(s) {
const h = String(Math.floor(s/3600)).padStart(2,'0');
const m = String(Math.floor((s%3600)/60)).padStart(2,'0');
const sc = String(s%60).padStart(2,'0');
return `${h}:${m}:${sc}`;
}

function nowStr() {
return new Date().toLocaleTimeString('en-GB');
}

function addLog(msg, type='info') {
const body = document.getElementById('logBody');
const entry = document.createElement('div');
entry.className = 'log-entry';
entry.innerHTML = `<span class="log-time">${nowStr()}</span><span class="log-msg-${type}">${msg}</span>`;
body.prepend(entry);
document.getElementById('logTimestamp').textContent = nowStr();
if(body.children.length > 20) body.removeChild(body.lastChild);
}

function setStatus(type, text) {
const pill = document.getElementById('statusPill');
pill.className = 'status-pill pill-' + type;
document.getElementById('statusText').textContent = text;
}

function startInstance() {
seconds = 0; cpuPeak = 0;
document.getElementById('instanceId').textContent = randomId();
document.getElementById('invoiceCard').style.display = 'none';

document.getElementById('startBtn').disabled = true;
document.getElementById('stopBtn').disabled = false;
setStatus('running', 'Running');

addLog('Instance starting... Allocating resources.', 'warn');
setTimeout(() => addLog('[CloudMonitor] Auto-monitoring activated on ecs.g7.large', 'ok'), 600);
setTimeout(() => addLog('[Billing] Pay-As-You-Go billing session started.', 'info'), 1200);

// Uptime + billing
timer = setInterval(() => {
    seconds++;
    document.getElementById('uptimeVal').textContent = formatTime(seconds);
    document.getElementById('uptimeSub').textContent = 'Instance running...';
    document.getElementById('costVal').textContent = (seconds * rate).toFixed(6);
}, 1000);

// CPU monitor
monitorCpu = setInterval(() => {
    const cpu = Math.floor(Math.random() * 45) + 8;
    cpuPeak = Math.max(cpuPeak, cpu);
    document.getElementById('cpuVal').textContent = cpu;
    document.getElementById('cpuBar').style.width = cpu + '%';
    document.getElementById('cpuBar').style.background = cpu > 70
    ? 'linear-gradient(90deg,#f5222d,#ff7875)'
    : cpu > 45
        ? 'linear-gradient(90deg,#faad14,#ffd666)'
        : 'linear-gradient(90deg,#00b96b,#52c41a)';
    if(cpu > 40) addLog(`[CloudMonitor] CPU spike detected: ${cpu}%`, 'warn');
}, 1800);

// Network monitor
monitorNet = setInterval(() => {
    const net = (Math.random() * 200 + 10).toFixed(1);
    document.getElementById('netVal').textContent = net;
    document.getElementById('netBar').style.width = (net/400*100) + '%';
}, 2200);
}

function stopInstance() {
clearInterval(timer);
clearInterval(monitorCpu);
clearInterval(monitorNet);

document.getElementById('startBtn').disabled = false;
document.getElementById('stopBtn').disabled = true;
setStatus('terminated', 'Released');
document.getElementById('cpuVal').textContent = '0';
document.getElementById('cpuBar').style.width = '0%';
document.getElementById('netVal').textContent = '0.0';
document.getElementById('netBar').style.width = '0%';
document.getElementById('uptimeSub').textContent = 'Instance stopped';

addLog('[Billing] Session ended. Generating invoice...', 'warn');
setTimeout(() => addLog('[Billing] Invoice generated. Total: ¥ ' + (seconds * rate).toFixed(6), 'ok'), 500);

// Show invoice
const total = (seconds * rate).toFixed(6);
document.getElementById('finalDuration').textContent = seconds + ' seconds (' + formatTime(seconds) + ')';
document.getElementById('finalBill').textContent = total;
document.getElementById('finalCpu').textContent = cpuPeak + '% (peak)';
document.getElementById('invoiceCard').style.display = 'block';
document.getElementById('invoiceCard').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Init clock
setInterval(() => {
document.getElementById('logTimestamp').textContent = nowStr();
}, 1000);