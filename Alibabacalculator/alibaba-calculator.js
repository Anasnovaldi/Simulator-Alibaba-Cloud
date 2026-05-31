// Rates (¥/hr) per spec per region multiplier
const BASE_RATES = {
ecs: { g7l: 0.397, g7xl: 0.794, g72xl: 1.588, c7l: 0.331 },
rds: { g7l: 0.88,  g7xl: 1.76,  g72xl: 3.52,  c7l: 0.65  },
oss: { g7l: 0.12,  g7xl: 0.18,  g72xl: 0.24,  c7l: 0.10  },
slb: { g7l: 0.22,  g7xl: 0.38,  g72xl: 0.55,  c7l: 0.18  },
};

const REGION_MULT = { jakarta: 1.0, singapore: 1.12, frankfurt: 1.25, virginia: 1.08 };

const SUB_DISCOUNT = { 1: 0, 3: 0.05, 6: 0.10, 12: 0.15, 36: 0.30 };

let activeTab = 'both';

function setTab(t) {
activeTab = t;
['both','sub','payg'].forEach(id => {
    document.getElementById('tab'+id.charAt(0).toUpperCase()+id.slice(1)).classList.remove('active');
});
document.getElementById('tab'+t.charAt(0).toUpperCase()+t.slice(1)).classList.add('active');
}

function updateRates() { /* live-update could go here */ }

function getBaseRate() {
const svc = document.getElementById('serviceType').value;
const spec = document.getElementById('specType').value;
const region = document.getElementById('region').value;
return BASE_RATES[svc][spec] * REGION_MULT[region];
}

function fmt(n) { return '¥ ' + n.toLocaleString('en', {minimumFractionDigits:2, maximumFractionDigits:2}); }
function fmtRaw(n) { return n.toLocaleString('en', {minimumFractionDigits:2, maximumFractionDigits:2}); }

function calculate() {
const hourlyRate = getBaseRate();
const months = parseInt(document.getElementById('subDuration').value);
const hours = parseInt(document.getElementById('hoursSlider').value);
const instances = parseInt(document.getElementById('instanceSlider').value);
const discount = SUB_DISCOUNT[months];

const totalHours = 730 * months; // avg hours in a month * months

// Subscription: pay for all hours in period at discounted rate
const subTotal = hourlyRate * totalHours * instances * (1 - discount);
const subMonthly = subTotal / months;

// PAYG: pay only for used hours at full rate
const paygMonthly = hourlyRate * hours * instances;
const paygTotal = paygMonthly * months;

document.getElementById('subDiscountLabel').textContent = (discount*100).toFixed(0) + '% off';

// Build result cards
const showSub = activeTab !== 'payg';
const showPayg = activeTab !== 'sub';

document.getElementById('placeholder').style.display = 'none';
document.getElementById('resultPanel').style.display = 'block';

const cardsEl = document.getElementById('compCards');
cardsEl.innerHTML = '';

const winner = paygTotal < subTotal ? 'payg' : 'sub';
const cols = activeTab === 'both' ? '1fr 1fr' : '1fr';
cardsEl.style.gridTemplateColumns = cols;

if (showSub) {
    cardsEl.innerHTML += buildBillingCard({
    type: 'sub',
    label: '📦 Subscription',
    desc: months + ' month' + (months>1?'s':'') + ' · ' + (discount*100).toFixed(0) + '% discount',
    total: subTotal,
    monthly: subMonthly,
    breakdown: [
        { label: 'Hourly Rate (before discount)', val: fmt(hourlyRate) + '/hr' },
        { label: 'Discount', val: '-' + (discount*100).toFixed(0) + '%' },
        { label: 'Effective Rate', val: fmt(hourlyRate*(1-discount)) + '/hr' },
        { label: 'Total Hours (reserved)', val: (totalHours * instances).toLocaleString() + ' hr' },
        { label: 'Instances', val: instances },
        { label: 'Total Cost', val: fmt(subTotal) },
    ],
    winner: winner === 'sub'
    });
}

if (showPayg) {
    cardsEl.innerHTML += buildBillingCard({
    type: 'payg',
    label: '⏱ Pay-As-You-Go',
    desc: hours + ' hr/mo · metered per hour',
    total: paygTotal,
    monthly: paygMonthly,
    breakdown: [
        { label: 'Hourly Rate (full)', val: fmt(hourlyRate) + '/hr' },
        { label: 'Usage per Month', val: hours + ' hr' },
        { label: 'Instances', val: instances },
        { label: 'Monthly Cost', val: fmt(paygMonthly) },
        { label: 'Usage vs Full Month', val: ((hours/730)*100).toFixed(0) + '%' },
        { label: 'Total Cost', val: fmt(paygTotal) },
    ],
    winner: winner === 'payg'
    });
}

// Savings box
if (activeTab === 'both') {
    const saving = Math.abs(paygTotal - subTotal);
    const cheaperMode = winner === 'sub' ? 'Subscription' : 'Pay-As-You-Go';
    const usage_pct = ((hours/730)*100).toFixed(0);
    document.getElementById('savingsBox').style.display = 'flex';
    document.getElementById('savingsBox').innerHTML = `
    <div>
        <h4>🏆 ${cheaperMode} is cheaper for your usage pattern</h4>
        <p>You use ${usage_pct}% of a full month · ${hours}hr/${730}hr</p>
        ${winner === 'payg' && hours < 730
        ? `<p style="margin-top:4px;color:#888;font-size:12px">💡 At ${Math.floor(730*(1-discount))} hr/mo usage, Subscription becomes cheaper</p>`
        : winner === 'sub'
            ? `<p style="margin-top:4px;color:#888;font-size:12px">💡 If usage drops below ${Math.floor(730*(1-discount))} hr/mo, consider PAYG</p>`
            : ''
        }
    </div>
    <div style="text-align:right">
        <div class="savings-amount">¥ ${fmtRaw(saving)}</div>
        <div style="font-size:12px;color:#52c41a">saved over ${months} month${months>1?'s':''}</div>
    </div>
    `;
} else {
    document.getElementById('savingsBox').style.display = 'none';
}

// Monthly table
const tbody = document.getElementById('monthlyBody');
tbody.innerHTML = '';
for (let m = 1; m <= Math.min(months, 12); m++) {
    const subCum = subMonthly * m;
    const paygCum = paygMonthly * m;
    const diff = paygCum - subCum;
    const diffStr = diff >= 0
    ? `<span style="color:var(--ali-success)">PAYG +${fmtRaw(diff)}</span>`
    : `<span style="color:var(--ali-sub)">SUB +${fmtRaw(-diff)}</span>`;
    tbody.innerHTML += `
    <tr>
        <td style="font-family:'DM Mono',monospace;font-size:12.5px">Month ${m}</td>
        <td style="font-family:'DM Mono',monospace">${fmt(subCum)}</td>
        <td style="font-family:'DM Mono',monospace">${fmt(paygCum)}</td>
        <td style="font-size:12.5px">${diffStr}</td>
    </tr>
    `;
}

// Break-even label
const beHours = 730 * (1 - discount);
document.getElementById('breakEvenLabel').textContent =
    `Break-even point: ~${Math.floor(beHours)} hr/mo usage`;
}

function buildBillingCard({ type, label, desc, total, monthly, breakdown, winner }) {
const colorClass = type === 'sub' ? 'sub-head' : 'payg-head';
const winnerTag = winner ? '<span class="winner-tag">✓ Cheaper</span>' : '';
const priceColor = type === 'sub' ? 'price-sub-color' : 'price-payg-color';
const winnerClass = winner ? 'winner' : '';
const rows = breakdown.map(r =>
    `<div class="breakdown-row"><span class="bk-label">${r.label}</span><span class="bk-val">${r.val}</span></div>`
).join('');

return `
    <div class="billing-card ${winnerClass} fade-up stagger-${type==='sub'?'1':'2'}">
    <div class="billing-card-head ${colorClass}">
        <div>
        <h4>${label}</h4>
        <p>${desc}</p>
        </div>
        ${winnerTag}
    </div>
    <div class="billing-card-body">
        <div class="price-display">
        <span class="price-currency">¥</span>
        <span class="price-main ${priceColor}">${fmtRaw(monthly)}</span>
        <span class="price-period">/month</span>
        </div>
        <div style="font-size:12px;color:var(--ali-muted);margin-bottom:14px">
        Total for period: <strong style="color:var(--ali-text)">¥ ${fmtRaw(total)}</strong>
        </div>
        ${rows}
    </div>
    </div>
`;
}