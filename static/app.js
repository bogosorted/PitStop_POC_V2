/**
 * PitStop V2 — Cantina Universitária CESAR (Redesign para 15 Minutos + Personas & Capacidade Real)
 * Conceptual Integrity (Cap. 5):
 * - 100% English code identifiers; natural Portuguese UI focused on the 4 Personas:
 *   Lucas (Pressa), Mariana (Planejada), Rafael (Almoço/Turno), and Patrícia (Atendente).
 */

const ICONS = {
  bell: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>`,
  bellRing: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/><path d="M4 2C2.8 3.7 2 5.7 2 8"/><path d="M22 8c0-2.3-.8-4.3-2-6"/></svg>`,
  clock: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  box: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
  tv: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>`,
  smartphone: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
  layout: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="12" y1="3" x2="12" y2="21"/></svg>`,
  shoppingBag: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
  arrowLeft: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
  arrowRight: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  menu: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>`,
  x: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  search: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  info: `<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
  code: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`
};

class SoundNotifier {
  constructor() {
    this.enabled = true;
    this.ctx = null;
  }

  _initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  play(type = 'newOrder') {
    if (!this.enabled) return;
    try {
      this._initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';

      if (type === 'newOrder') {
        osc.frequency.setValueAtTime(587.33, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'ready') {
        osc.frequency.setValueAtTime(659.25, now);
        osc.frequency.setValueAtTime(1046.50, now + 0.12);
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.45);
      } else if (type === 'call') {
        const osc2 = this.ctx.createOscillator();
        const gain2 = this.ctx.createGain();
        osc.frequency.setValueAtTime(783.99, now);
        osc.frequency.setValueAtTime(1046.50, now + 0.14);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(783.99, now + 0.22);
        osc2.frequency.setValueAtTime(1046.50, now + 0.36);
        gain2.gain.setValueAtTime(0.10, now + 0.22);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc2.connect(gain2);
        gain2.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.5);
        osc2.start(now + 0.22);
        osc2.stop(now + 0.7);
      }
    } catch (_) {}
  }
}

const sounds = new SoundNotifier();

// --- Application State ---
const state = {
  viewMode: 'split', // 'split' | 'student' | 'staff' | 'staff-mobile' | 'tv' | 'chapter5'
  // Student Screens matching the 4-Screen Redesign PDF + Subviews from Menu Hub:
  // 'home' (Tela 1: O que vai ser hoje?)
  // 'checkout' (Tela 2: <- Pagamento)
  // 'pix' (Tela 3: <- Pix & Senha PS-105)
  // 'menu-hub' (Tela 4: Olá, [nome] 👋 - Horários, Pedidos, Perfil, Descontos)
  // 'hours' (Subtela Horários & Capacidade das Estufas)
  // 'orders-history' (Subtela Pedidos & Senhas ao vivo)
  // 'profile-personas' (Subtela Perfil & Personas do estudo)
  // 'discounts' (Subtela Descontos & Cupons Ativos - Cap. 5 OCP)
  studentScreen: 'home',
  staffSection: 'queue', // 'queue' | 'metrics' | 'inventory'
  staffMobileTab: 'queue', // 'queue' | 'preparing' | 'ready' | 'inventory'
  selectedCategory: 'Destaques 15m',
  searchQuery: '',
  // Pre-seed cart with 1x Coxinha de frango + 1x Café especial (2 itens, matching Tela 1 & Tela 2 of the PDF!)
  cart: { 1: 1, 3: 1 },
  activePersonaCode: 'LUCAS',
  studentName: 'Lucas (CC · 3º período)',
  selectedLocation: 'BRUM', // Brum (~8 min), Tiradentes (~6 min), Apolo (~7 min)
  selectedTimeSlot: '15:45',
  projectionLocation: 'BRUM',
  staffMetricsLocation: 'ALL',
  selectedPayment: 'PIX', // 'PIX' | 'BALCAO' | 'COMBO_DIA' | 'PITSTOP_WALLET' | 'RESIDENCY_VOUCHER'
  activeCouponCode: null, // null | 'COMBO_DIA' | 'PITSTOP_WALLET' | 'RESIDENCY_VOUCHER'
  pixPaymentConfirmed: false,
  studentOrderIds: [],
  currentOrder: null,
  selectedProductModal: null,
  studentAlert: null,
  staffAlert: null,
  studentLoading: null,
  staffLoading: null,
  tvClock: '15:45:00',
  data: null
};

// --- Scoped Alerts ---
function showStudentAlert(title, text, type = 'info') {
  state.studentAlert = { title, text, type };
  renderStudentOnly();
  setTimeout(() => {
    if (state.studentAlert && state.studentAlert.title === title) {
      state.studentAlert = null;
      renderStudentOnly();
    }
  }, 3800);
}

function showStaffAlert(title, text, type = 'info') {
  state.staffAlert = { title, text, type };
  renderStaffOnly();
  setTimeout(() => {
    if (state.staffAlert && state.staffAlert.title === title) {
      state.staffAlert = null;
      renderStaffOnly();
    }
  }, 3800);
}

// --- Navigation Helpers ---
function switchViewMode(mode) {
  if (state.viewMode === mode) return;
  state.viewMode = mode;
  render();
}

function navigateStudent(screen) {
  state.studentScreen = screen;
  renderStudentOnly();
}

function switchStaffSection(sec) {
  if (state.staffSection === sec) return;
  state.staffSection = sec;
  renderStaffOnly();
}

function switchStaffMobileTab(tab) {
  if (state.staffMobileTab === tab) return;
  state.staffMobileTab = tab;
  renderStaffOnly();
}

// --- Persona Switcher (Connects Personas PDF directly to Student App!) ---
function selectPersonaProfile(code) {
  const personas = (state.data && state.data.dashboard && state.data.dashboard.personas) || [];
  const found = personas.find(p => p.code === code);
  if (!found) return;

  state.activePersonaCode = found.code;
  state.studentName = found.name;
  state.selectedLocation = found.default_location;
  state.selectedTimeSlot = found.default_slot;

  if (found.code === 'LUCAS') {
    state.cart = { 1: 1, 3: 1 }; // Coxinha + Café especial
    state.selectedPayment = 'PIX';
    state.activeCouponCode = null;
    state.selectedCategory = 'Destaques 15m';
  } else if (found.code === 'MARIANA') {
    state.cart = { 2: 1, 3: 1 }; // Combo do dia: Pão de queijo + Café especial
    state.activeCouponCode = 'COMBO_DIA';
    state.selectedPayment = 'COMBO_DIA';
    state.selectedCategory = 'Destaques 15m';
  } else if (found.code === 'RAFAEL') {
    state.cart = { 5: 1, 4: 1 }; // Almoço do dia + Suco natural
    state.selectedPayment = 'PIX';
    state.activeCouponCode = null;
    state.selectedCategory = 'Almoço do Dia';
  }

  showStudentAlert(
    `Persona ativa: ${found.short_name}`,
    `"${found.quote}"`
  );
  renderStudentOnly();
}

function getStudentShortName() {
  const raw = (state.studentName || 'Lucas').trim();
  return raw.split(' ')[0] || 'Lucas';
}

function getStudentActiveOrders() {
  if (!state.data || !state.data.dashboard || !state.data.dashboard.orders) return [];
  const { orders } = state.data.dashboard;
  const shortName = getStudentShortName().toLowerCase();

  return orders.filter(o => {
    const isMine = (state.studentOrderIds && state.studentOrderIds.includes(o.id)) ||
      (shortName && o.student_name && o.student_name.toLowerCase().includes(shortName));
    return isMine;
  });
}

// --- Loading Wrappers ---
async function withStudentLoading(message, asyncFn) {
  state.studentLoading = message;
  updateStudentLoadingOverlay();
  try {
    const minDelay = new Promise(resolve => setTimeout(resolve, 280));
    const [result] = await Promise.all([asyncFn(), minDelay]);
    return result;
  } finally {
    state.studentLoading = null;
    render();
  }
}

async function withStaffLoading(message, asyncFn) {
  state.staffLoading = message;
  updateStaffLoadingOverlay();
  try {
    const minDelay = new Promise(resolve => setTimeout(resolve, 280));
    const [result] = await Promise.all([asyncFn(), minDelay]);
    return result;
  } finally {
    state.staffLoading = null;
    render();
  }
}

// --- Fetch Server State ---
async function fetchServerState() {
  try {
    const res = await fetch('/api/state').then(r => r.json());
    state.data = res;
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

// --- Live Clock ---
setInterval(() => {
  const d = new Date();
  state.tvClock = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
  if (state.viewMode === 'tv') {
    const el = document.getElementById('tv-live-clock');
    if (el) el.textContent = state.tvClock;
  }
}, 1000);

// --- Realtime Poller ---
async function startPoller() {
  setInterval(async () => {
    if (!state.data) return;
    try {
      const fresh = await fetch('/api/state').then(r => r.json());
      const oldOrders = state.data.dashboard.orders;
      const oldIds = new Set(oldOrders.map(o => o.id));
      const hasNew = fresh.dashboard.orders.some(o => !oldIds.has(o.id));

      const myOrders = getStudentActiveOrders();
      for (const myOrder of myOrders) {
        const prevOrder = state.data.dashboard.orders.find(o => o.id === myOrder.id);
        const updated = fresh.dashboard.orders.find(o => o.id === myOrder.id);
        if (updated) {
          if (state.currentOrder && state.currentOrder.id === updated.id) {
            state.currentOrder = updated;
          }
          if (updated.status === 'READY' && (!prevOrder || prevOrder.status !== 'READY')) {
            sounds.play('ready');
            showStudentAlert('Pedido Pronto!', `Senha ${updated.ticket_code} pronta para retirada no balcão ${updated.location_name}!`);
          }
          if (prevOrder && (updated.call_count || 0) > (prevOrder.call_count || 0)) {
            sounds.play('call');
            showStudentAlert('Chamada no Balcão!', `Patrícia está chamando a senha ${updated.ticket_code} no balcão ${updated.location_name}!`);
          }
        }
      }

      state.data = fresh;

      if (hasNew) {
        sounds.play('newOrder');
      }

      const activeEl = document.activeElement;
      const isInput = activeEl && ['INPUT', 'SELECT', 'TEXTAREA'].includes(activeEl.tagName);
      if (!isInput && !state.studentLoading && !state.staffLoading && !state.selectedProductModal) {
        render();
      }
    } catch (_) {}
  }, 3500);
}

// --- Cart & Combo Helpers ---
function updateCart(productId, delta) {
  const product = state.data.catalog.find(p => p.id === productId);
  if (!product) return;
  const current = state.cart[productId] || 0;
  const next = current + delta;

  if (next <= 0) {
    delete state.cart[productId];
  } else if (next <= product.stock) {
    state.cart[productId] = next;
  } else {
    showStudentAlert('Estoque insuficiente', `Restam apenas ${product.stock} un. de ${product.name}.`);
    return;
  }

  if (Object.keys(state.cart).length === 0 && state.studentScreen === 'checkout') {
    state.studentScreen = 'home';
  }
  renderStudentOnly();
}

function applyDailyCombo() {
  // Adds Pão de queijo (id 2) + Café especial (id 3) and activates 15% OFF Combo do Dia strategy
  state.cart[2] = (state.cart[2] || 0) + 1;
  state.cart[3] = (state.cart[3] || 0) + 1;
  state.activeCouponCode = 'COMBO_DIA';
  state.selectedPayment = 'COMBO_DIA';
  sounds.play('newOrder');
  showStudentAlert('Combo do dia adicionado! ☕🧀', 'Café especial + Pão de queijo com 15% OFF aplicado.');
}

function activateCouponStrategy(strategyCode, label) {
  if (state.activeCouponCode === strategyCode) {
    state.activeCouponCode = null;
    state.selectedPayment = 'PIX';
    showStudentAlert('Cupom removido', 'Pagamento voltou para Pix padrão.');
  } else {
    state.activeCouponCode = strategyCode;
    state.selectedPayment = strategyCode;
    sounds.play('newOrder');
    showStudentAlert('Cupom Ativado! 🏷️', `${label} aplicado automaticamente via PaymentStrategy (Cap. 5 OCP).`);
  }
  renderStudentOnly();
}

function getCartMetrics() {
  let subtotal = 0;
  let count = 0;
  let maxPrep = 2;
  if (!state.data) return { subtotal, count, maxPrep, discount: 0, total: 0, discountLabel: '' };

  Object.entries(state.cart).forEach(([pid, qty]) => {
    const item = state.data.catalog.find(p => p.id === Number(pid));
    if (item && qty > 0) {
      subtotal += item.price * qty;
      count += qty;
      maxPrep = Math.max(maxPrep, item.prep_time_min);
    }
  });

  let discountRate = 0;
  let discountLabel = '';
  const paymentCode = state.selectedPayment;
  if (paymentCode === 'COMBO_DIA') {
    discountRate = 0.15;
    discountLabel = '15% OFF · Combo do Dia';
  } else if (paymentCode === 'PITSTOP_WALLET') {
    discountRate = 0.05;
    discountLabel = '5% OFF · Saldo PitStop';
  } else if (paymentCode === 'RESIDENCY_VOUCHER') {
    discountRate = 0.12;
    discountLabel = '12% OFF · Voucher Monitoria';
  }

  const discount = round2(subtotal * discountRate);
  const total = Math.max(0, round2(subtotal - discount));

  return { subtotal: round2(subtotal), count, maxPrep, discount, total, discountLabel };
}

function round2(n) {
  return Math.round(n * 100) / 100;
}

function formatBRL(val) {
  return `R$ ${Number(val).toFixed(2).replace('.', ',')}`;
}

function getLocationWaitMinutes(locCode) {
  if (!state.data || !state.data.dashboard) return 7;
  const { pickup_locations, orders } = state.data.dashboard;
  const loc = pickup_locations.find(l => l.code === locCode);
  const baseSla = loc ? loc.target_sla_min : 7;
  const activeInLoc = orders.filter(
    o => (o.status === 'QUEUED' || o.status === 'PREPARING') && o.pickup_location === locCode
  );
  // Real oven cycle formula from Personas PDF: 4 snacks per 2-min cycle
  const itemsInQueue = activeInLoc.reduce((acc, o) => acc + (o.total_items_count || 1), 0);
  const extraCycles = Math.floor(itemsInQueue / 4);
  return baseSla + extraCycles * 2;
}

// --- Submit Order (Tela 2 -> Tela 3 Pix & Senha PS-105) ---
async function handleOrderSubmit() {
  const items = Object.entries(state.cart)
    .filter(([_, qty]) => qty > 0)
    .map(([pid, qty]) => ({
      product_id: Number(pid),
      quantity: Number(qty)
    }));

  if (items.length === 0) {
    showStudentAlert('Sacola vazia', 'Escolha pelo menos 1 item para pedir.');
    return;
  }

  const nameInput = document.getElementById('checkout-student-name-input');
  if (nameInput && nameInput.value.trim()) {
    state.studentName = nameInput.value.trim();
  }

  const payload = {
    student_name: state.studentName || 'Lucas (CC)',
    pickup_location: state.selectedLocation || 'BRUM',
    time_slot: state.selectedTimeSlot || '15:45',
    payment_method: state.selectedPayment || 'PIX',
    items
  };

  await withStudentLoading('Gerando seu pedido e reservando fornada...', async () => {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await res.json();
      if (!res.ok) {
        showStudentAlert('Atenção', result.error || 'Erro ao confirmar pedido.');
        return;
      }
      state.cart = {};
      state.data = result.state;
      state.studentOrderIds.push(result.order.id);
      state.currentOrder = result.order;
      state.pixPaymentConfirmed = payload.payment_method === 'BALCAO';
      state.studentScreen = 'pix';
      sounds.play('newOrder');
    } catch (err) {
      showStudentAlert('Erro de conexão', 'Não foi possível enviar o pedido.');
    }
  });
}

function copyPixCode() {
  const code = '00020126580014br.gov.bcb.pix0136pitstop-cantina-cesar-school-recife5204000053039865802BR5913PITSTOP CESAR6006RECIFE62070503***6304ABCD';
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(code).catch(() => {});
  }
  state.pixPaymentConfirmed = true;
  sounds.play('ready');
  showStudentAlert('Código Pix copiado! ⚡', 'Pagamento confirmado instantaneamente! Sua senha foi liberada.');
}

// --- Staff Actions ---
async function handleAdvanceOrder(orderId) {
  await withStaffLoading('Atualizando etapa do pedido...', async () => {
    try {
      const res = await fetch('/api/orders/advance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: orderId })
      });
      const result = await res.json();
      if (!res.ok) {
        showStaffAlert('Aviso', result.error || 'Erro ao atualizar pedido');
        return;
      }
      state.data = result.state;
      if (state.currentOrder && state.currentOrder.id === orderId) {
        state.currentOrder = result.order;
      }
      if (result.order.status === 'READY') {
        sounds.play('ready');
        showStaffAlert(`Senha ${result.order.ticket_code} PRONTA`, `Aluno avisado para retirada no balcão ${result.order.location_name}.`);
      } else if (result.order.status === 'DELIVERED') {
        sounds.play('newOrder');
        showStaffAlert(`Senha ${result.order.ticket_code} ENTREGUE`, `Entrega concluída com sucesso.`);
      } else {
        showStaffAlert(`Em Preparo (${result.order.ticket_code})`, `Lote enviado para aquecimento (ciclo de 2 min).`);
      }
    } catch (_) {}
  });
}

async function handleReNotifyOrder(orderId) {
  await withStaffLoading('Chamando senha novamente...', async () => {
    try {
      const res = await fetch('/api/orders/re-notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: orderId })
      });
      const result = await res.json();
      if (res.ok) {
        state.data = result.state;
        if (state.currentOrder && state.currentOrder.id === orderId) {
          state.currentOrder = result.order;
        }
        sounds.play('call');
        showStaffAlert(`Senha ${result.order.ticket_code} rechamada`, `Alerta sonoro enviado ao celular do aluno e TV.`);
      }
    } catch (_) {}
  });
}

async function handleRequestStock(productId, delta = 8) {
  const product = state.data.catalog.find(p => p.id === productId);
  if (!product) return;
  const newStock = product.stock + delta;

  await withStaffLoading(`Repondo fornada de ${product.name}...`, async () => {
    try {
      const res = await fetch('/api/products/stock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId, new_stock: newStock })
      });
      const result = await res.json();
      if (res.ok) {
        state.data = result.state;
        sounds.play('newOrder');
        showStaffAlert('Fornada reposta', `+${delta} un. (2 ciclos de máquina) adicionadas a ${result.product.name}.`);
      }
    } catch (_) {}
  });
}

async function handleUpdateStock(productId, newStock) {
  try {
    const res = await fetch('/api/products/stock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: productId, new_stock: Math.max(0, newStock) })
    });
    const result = await res.json();
    if (res.ok) {
      state.data = result.state;
      render();
    }
  } catch (_) {}
}

async function handleCreateProduct(e) {
  e.preventDefault();
  const form = e.target;
  const payload = {
    name: form.name.value.trim(),
    category: form.category.value,
    price: parseFloat(form.price.value || '6.50'),
    prep_time_min: parseInt(form.prep_time.value || '2', 10),
    stock: parseInt(form.stock.value || '16', 10),
    image_url: form.image_url.value || '/static/images/coxinha.jpg',
    badge: form.badge.value.trim() || 'Novo no Turno',
    description: form.description.value.trim() || 'Preparado na cantina CESAR respeitando o ciclo rápido de 2 minutos.',
    ingredients: form.ingredients.value.trim() || 'Ingredientes frescos selecionados.',
    icon: form.icon ? form.icon.value : '🥐'
  };

  await withStaffLoading('Publicando item no cardápio...', async () => {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await res.json();
      if (res.ok) {
        state.data = result.state;
        form.reset();
        sounds.play('newOrder');
        showStaffAlert('Item cadastrado', `${result.product.name} disponível no app do aluno.`);
      }
    } catch (_) {}
  });
}

async function handleResetData() {
  await withStaffLoading('Restaurando estado inicial da demonstração...', async () => {
    const res = await fetch('/api/reset', { method: 'POST' });
    if (res.ok) {
      const data = await res.json();
      state.data = data.state;
      state.cart = { 1: 1, 3: 1 };
      state.activePersonaCode = 'LUCAS';
      state.studentName = 'Lucas (CC · 3º período)';
      state.selectedLocation = 'BRUM';
      state.selectedTimeSlot = '15:45';
      state.selectedPayment = 'PIX';
      state.activeCouponCode = null;
      state.studentOrderIds = [];
      state.currentOrder = null;
      state.studentScreen = 'home';
      showStudentAlert('Demo restaurada!', 'Pronto para testar o pedido PS-105.');
    }
  });
}

function openProductModal(productId) {
  state.selectedProductModal = state.data.catalog.find(p => p.id === productId) || null;
  updateStudentModalMount();
}

function closeProductModal() {
  state.selectedProductModal = null;
  updateStudentModalMount();
}

// ============================================================================
// --- BRAND & GLOBAL NAVIGATION BAR ---
// ============================================================================

function renderPitStopLogoWordmark({ darkBg = false, size = 'base' } = {}) {
  const textSize = size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-base' : 'text-xl';
  const iconSize = size === 'lg' ? 'w-10 h-10 rounded-2xl' : size === 'sm' ? 'w-7 h-7 rounded-xl' : 'w-9 h-9 rounded-xl';
  const pitColor = darkBg ? 'text-white' : 'text-[#1C1C1E]';

  return `
    <div class="inline-flex items-center gap-2.5 select-none">
      <div class="${iconSize} bg-[#EE651D] flex items-center justify-center shadow-sm shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
          <line x1="10" y1="2" x2="14" y2="2"/>
          <line x1="12" y1="14" x2="15" y2="11"/>
          <circle cx="12" cy="14" r="8"/>
        </svg>
      </div>
      <span class="${textSize} font-extrabold tracking-tight leading-none">
        <span class="${pitColor}">Pit</span><span class="text-[#EE651D]">Stop</span>
      </span>
    </div>
  `;
}

function renderTopBar() {
  return `
    <nav class="bg-[#1C1C1E] text-neutral-300 py-2.5 px-4 border-b border-neutral-800 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          ${renderPitStopLogoWordmark({ darkBg: true, size: 'sm' })}
          <span class="hidden sm:inline-block text-[11px] font-mono bg-neutral-800 text-neutral-300 px-2.5 py-0.5 rounded-full border border-neutral-700">
            PoC Final V2 · 15 Minutos & Personas
          </span>
        </div>

        <div class="flex items-center bg-neutral-800/90 p-1 rounded-2xl text-xs flex-wrap gap-1">
          <button onclick="switchViewMode('split');"
            class="px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${state.viewMode === 'split' ? 'bg-[#EE651D] text-white font-bold shadow-sm' : 'text-neutral-400 hover:text-white'}">
            ${ICONS.layout}
            <span>Lado a Lado</span>
          </button>
          <button onclick="switchViewMode('student');"
            class="px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${state.viewMode === 'student' ? 'bg-[#EE651D] text-white font-bold shadow-sm' : 'text-neutral-400 hover:text-white'}">
            ${ICONS.shoppingBag}
            <span>App do Aluno (Redesign)</span>
          </button>
          <button onclick="switchViewMode('staff');"
            class="px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${state.viewMode === 'staff' ? 'bg-[#EE651D] text-white font-bold shadow-sm' : 'text-neutral-400 hover:text-white'}">
            ${ICONS.box}
            <span>Painel Patrícia (Cantina)</span>
          </button>
          <button onclick="switchViewMode('staff-mobile');"
            class="px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${state.viewMode === 'staff-mobile' ? 'bg-[#EE651D] text-white font-bold shadow-sm' : 'text-neutral-400 hover:text-white'}">
            ${ICONS.smartphone}
            <span>Celular Balcão</span>
          </button>
          <button onclick="switchViewMode('tv');"
            class="px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${state.viewMode === 'tv' ? 'bg-[#EE651D] text-white font-bold shadow-sm' : 'text-neutral-400 hover:text-white'}">
            ${ICONS.tv}
            <span>Modo TV</span>
          </button>
          <button onclick="switchViewMode('chapter5');"
            class="px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${state.viewMode === 'chapter5' ? 'bg-white text-[#1C1C1E] font-bold shadow-sm' : 'text-[#EE651D] hover:text-white'}">
            ${ICONS.code}
            <span>Cap. 5 & Métricas</span>
          </button>
        </div>

        <div class="flex items-center gap-2">
          <button onclick="sounds.enabled = !sounds.enabled; render();"
            class="px-2.5 py-1 rounded-xl border border-neutral-700 text-neutral-400 hover:text-white text-[11px] transition">
            ${sounds.enabled ? '🔊 Som' : '🔇 Mudo'}
          </button>
          <button onclick="handleResetData();"
            class="px-2.5 py-1 rounded-xl border border-neutral-700 text-neutral-400 hover:text-white text-[11px] transition">
            Restaurar Demo
          </button>
        </div>
      </div>
    </nav>
  `;
}

// ============================================================================
// --- STUDENT APP (4-SCREEN REDESIGN PDF + PERSONAS & CAPACITY) ---
// ============================================================================

function renderStudentGlobalHeader() {
  const myOrders = getStudentActiveOrders();
  const hasReady = myOrders.some(o => o.status === 'READY');

  return `
    <header class="px-5 pt-5 pb-3 bg-[#FAF3EB] flex items-center justify-between gap-2">
      <div onclick="navigateStudent('home');" class="cursor-pointer">
        ${renderPitStopLogoWordmark({ darkBg: false, size: 'base' })}
      </div>

      <div class="flex items-center gap-2.5">
        <!-- Green Open Status Pill from PDF: "● Fecha às 20:30" -->
        <button onclick="navigateStudent('hours');"
          class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E8F5E9] text-[#1B5E20] text-xs font-semibold hover:brightness-95 transition">
          <span class="w-2 h-2 rounded-full bg-[#2E7D32]"></span>
          <span>Fecha às 20:30</span>
        </button>

        <!-- Circular Menu Button (≡) from PDF -> Opens Tela 4 (Menu do Aluno) -->
        <button onclick="navigateStudent(state.studentScreen === 'menu-hub' ? 'home' : 'menu-hub');"
          title="Menu do Aluno"
          class="relative w-10 h-10 rounded-full bg-[#EFE6DC] hover:bg-[#E5D9CC] text-[#1C1C1E] flex items-center justify-center transition shadow-sm">
          ${state.studentScreen === 'menu-hub' ? ICONS.x : ICONS.menu}
          ${hasReady ? `
            <span class="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#EE651D] ring-2 ring-[#FAF3EB] animate-ping"></span>
            <span class="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#EE651D] ring-2 ring-[#FAF3EB]"></span>
          ` : ''}
        </button>
      </div>
    </header>

    ${state.studentAlert ? `
      <div class="px-5 pb-2 slide-down-alert">
        <div class="p-3 rounded-2xl bg-[#1C1C1E] text-white text-xs flex items-center justify-between gap-2 shadow-lg border border-[#EE651D]/40">
          <div class="flex items-center gap-2.5">
            <span class="w-7 h-7 rounded-xl bg-[#EE651D] text-white flex items-center justify-center shrink-0 font-bold">⚡</span>
            <div>
              <p class="font-bold text-white leading-tight">${state.studentAlert.title}</p>
              ${state.studentAlert.text ? `<p class="text-[11px] text-neutral-300 mt-0.5">${state.studentAlert.text}</p>` : ''}
            </div>
          </div>
          <button onclick="state.studentAlert = null; renderStudentOnly();" class="text-neutral-400 hover:text-white p-1">${ICONS.x}</button>
        </div>
      </div>
    ` : ''}
  `;
}

// --- TELA 1: VITRINE RÁPIDA ("O que vai ser hoje? 😋") ---
function renderStudentHomeScreen() {
  const { catalog, dashboard } = state.data;
  const { pickup_locations } = dashboard;
  const cartInfo = getCartMetrics();

  // Order locations as in the PDF: Brum (~8 min), Tiradentes (~6 min), Apolo (~7 min)
  const orderedLocCodes = ['BRUM', 'TIRADENTES', 'APOLO'];
  const locations = orderedLocCodes
    .map(code => pickup_locations.find(l => l.code === code))
    .filter(Boolean);

  // Filter products
  let displayedProducts = [];
  if (state.selectedCategory === 'Destaques 15m') {
    // Exact 4 products from the 2x2 grid in the PDF!
    displayedProducts = catalog.slice(0, 4);
  } else if (state.selectedCategory === 'Todos') {
    displayedProducts = catalog;
  } else {
    displayedProducts = catalog.filter(p => p.category === state.selectedCategory);
  }

  return `
    <div class="px-5 pb-6 flex-1 flex flex-col justify-between space-y-4">
      <div class="space-y-4">
        <!-- Main Title from PDF -->
        <div class="flex items-center justify-between gap-2 pt-1">
          <h1 class="text-2xl sm:text-[26px] font-extrabold text-[#1C1C1E] tracking-tight leading-tight">
            O que vai ser hoje? 😋
          </h1>
          <button onclick="navigateStudent('profile-personas');"
            class="px-2.5 py-1 rounded-full bg-[#EFE6DC] hover:bg-[#E5D9CC] text-[11px] font-bold text-[#1C1C1E] flex items-center gap-1 shrink-0 transition"
            title="Trocar Persona de Teste">
            <span>👤 ${getStudentShortName()}</span>
          </button>
        </div>

        <!-- Unit Selector Pills with Live Wait Time from PDF: Brum (~8 min) | Tiradentes (~6 min) | Apolo (~7 min) -->
        <div class="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          ${locations.map(loc => {
            const waitMin = getLocationWaitMinutes(loc.code);
            const isSelected = state.selectedLocation === loc.code;
            return `
              <button onclick="state.selectedLocation = '${loc.code}'; renderStudentOnly();"
                class="px-3.5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#EE651D] text-white shadow-orangeGlow'
                    : 'bg-white text-[#1C1C1E] border border-[#E6DDD2] hover:border-[#EE651D]/50'
                }">
                ${loc.name} <span class="${isSelected ? 'text-white/90 font-medium' : 'text-neutral-400 font-medium'}">(~${waitMin} min)</span>
              </button>
            `;
          }).join('')}
        </div>

        <!-- Shift & Capacity Bar (Personas PDF: Agendamento conforme capacidade + Almoço do dia) -->
        <div class="flex items-center justify-between gap-2 px-3.5 py-2 rounded-2xl bg-[#EFE6DC]/75 text-[11px]">
          <div class="flex items-center gap-1.5 text-[#1C1C1E] font-semibold truncate">
            <span>🕒 Retirada:</span>
            ${['09:45', '11:30', '15:45', '18:30'].map(slot => `
              <button onclick="state.selectedTimeSlot = '${slot}'; renderStudentOnly();"
                class="px-2 py-0.5 rounded-lg font-mono text-[11px] transition ${
                  state.selectedTimeSlot === slot
                    ? 'bg-[#1C1C1E] text-white font-bold'
                    : 'text-neutral-600 hover:bg-white/60'
                }">
                ${slot}
              </button>
            `).join('')}
          </div>
          <span class="text-[10px] font-mono text-[#B45309] font-bold shrink-0 hidden sm:inline">
            🔥 4 un./ciclo 2m
          </span>
        </div>

        <!-- Dark Banner from PDF: "Combo do dia - Café + pão de queijo com desconto" -->
        <div onclick="applyDailyCombo();"
          class="p-4 rounded-3xl bg-[#1C1C1E] text-white flex items-center justify-between gap-3.5 cursor-pointer hover:brightness-110 transition shadow-card group">
          <div class="flex items-center gap-3.5">
            <div class="w-12 h-12 rounded-2xl bg-[#3A2E25] flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
              ☕🧀
            </div>
            <div>
              <div class="flex items-center gap-2">
                <p class="text-xs font-extrabold text-[#EE651D] uppercase tracking-wider">Combo do dia</p>
                ${state.activeCouponCode === 'COMBO_DIA' ? `
                  <span class="text-[10px] font-bold bg-[#2E7D32] text-white px-2 py-0.2 rounded-full">15% OFF Ativo</span>
                ` : ''}
              </div>
              <p class="text-sm font-bold text-white leading-snug mt-0.5">
                Café + pão de queijo com desconto
              </p>
            </div>
          </div>
          <span class="px-3 py-1.5 rounded-2xl bg-[#EE651D] text-white text-xs font-extrabold shrink-0">
            + R$ 7,65
          </span>
        </div>

        <!-- Category Filter Pills (Destaques 15m, Almoço do Dia for Rafael, Todos, etc.) -->
        <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          ${[
            { key: 'Destaques 15m', label: '⚡ Rápidos (15 min)' },
            { key: 'Almoço do Dia', label: '🍱 Almoço do Dia' },
            { key: 'Todos', label: 'Cardápio Completo' },
            { key: 'Salgados & Forno', label: 'Salgados' },
            { key: 'Doces & Bolos', label: 'Doces' },
            { key: 'Bebidas', label: 'Bebidas' }
          ].map(cat => `
            <button onclick="state.selectedCategory = '${cat.key}'; renderStudentOnly();"
              class="px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition ${
                state.selectedCategory === cat.key
                  ? 'bg-[#1C1C1E] text-white'
                  : 'bg-white/80 text-neutral-600 hover:bg-white'
              }">
              ${cat.label}
            </button>
          `).join('')}
        </div>

        <!-- 2x2 Product Grid matching PDF Cards -->
        <div class="grid grid-cols-2 gap-3.5 max-h-[410px] overflow-y-auto no-scrollbar pr-0.5">
          ${displayedProducts.map(product => {
            const qty = state.cart[product.id] || 0;
            const isOut = product.is_out_of_stock;
            const isMostOrdered = product.badge === 'Mais pedido' || product.id === 1;

            return `
              <div class="p-4 rounded-3xl bg-white border transition-all flex flex-col items-center text-center justify-between relative shadow-card ${
                isOut
                  ? 'opacity-55 border-neutral-200'
                  : qty > 0
                  ? 'border-[#EE651D] ring-2 ring-[#EE651D]/20'
                  : 'border-transparent hover:border-[#E6DDD2]'
              }">
                <!-- Top Circular Beige Image + Icon from PDF -->
                <div onclick="openProductModal(${product.id});" class="cursor-pointer flex flex-col items-center w-full">
                  <div class="relative w-16 h-16 rounded-full bg-[#F4ECE1] flex items-center justify-center mb-2.5 overflow-hidden shadow-inner group">
                    <img src="${product.image_url}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    <span class="absolute bottom-0 right-0 text-xs bg-[#FAF3EB]/90 px-1 rounded-tl-md">${product.icon || '🍴'}</span>
                  </div>

                  ${isMostOrdered ? `
                    <span class="px-2.5 py-0.5 rounded-full bg-[#FFF0E6] text-[#EE651D] text-[10px] font-extrabold mb-1">
                      Mais pedido
                    </span>
                  ` : product.badge ? `
                    <span class="px-2 py-0.5 rounded-full bg-[#F4ECE1] text-neutral-600 text-[10px] font-semibold mb-1">
                      ${product.badge}
                    </span>
                  ` : '<div class="h-4"></div>'}

                  <h3 class="text-sm font-extrabold text-[#1C1C1E] leading-tight line-clamp-2 mt-0.5">
                    ${product.name}
                  </h3>
                </div>

                <!-- Price + Orange Circular "+" Button from PDF -->
                <div class="w-full mt-3 pt-2 flex items-center justify-between gap-1">
                  <span class="text-sm font-bold text-neutral-600">
                    ${formatBRL(product.price)}
                  </span>

                  ${isOut ? `
                    <span class="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-full">Esgotado</span>
                  ` : qty > 0 ? `
                    <div class="flex items-center gap-1.5 bg-[#1C1C1E] text-white px-2 py-1 rounded-full text-xs font-bold">
                      <button onclick="updateCart(${product.id}, -1);" class="w-5 h-5 rounded-full flex items-center justify-center hover:bg-white/10">-</button>
                      <span class="font-mono text-xs min-w-[14px] text-center">${qty}</span>
                      <button onclick="updateCart(${product.id}, 1);" class="w-5 h-5 rounded-full bg-[#EE651D] text-white flex items-center justify-center">+</button>
                    </div>
                  ` : `
                    <button onclick="updateCart(${product.id}, 1);"
                      class="w-8 h-8 rounded-full bg-[#EE651D] hover:bg-[#D95614] text-white font-bold text-lg leading-none flex items-center justify-center shadow-sm transition">
                      +
                    </button>
                  `}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Sticky Bottom CTA from PDF: "Ver pedido · 2 itens" -->
      <div class="pt-2">
        <button onclick="${cartInfo.count > 0 ? "navigateStudent('checkout');" : "showStudentAlert('Escolha seu lanche', 'Toque no botão + em qualquer produto para montar seu pedido.');"}"
          class="w-full py-4 px-6 rounded-2xl font-extrabold text-base transition flex items-center justify-center gap-2 shadow-orangeGlow ${
            cartInfo.count > 0
              ? 'bg-[#EE651D] hover:bg-[#D95614] text-white cursor-pointer'
              : 'bg-[#E5D9CC] text-neutral-500 cursor-not-allowed'
          }">
          <span>Ver pedido · ${cartInfo.count} ${cartInfo.count === 1 ? 'item' : 'itens'}</span>
          ${cartInfo.count > 0 ? `<span class="text-white/90 font-semibold text-sm">(${formatBRL(cartInfo.total)})</span>` : ''}
        </button>
      </div>
    </div>
  `;
}

// --- TELA 2: CHECKOUT & PAGAMENTO ("← Pagamento") ---
function renderStudentCheckoutScreen() {
  const { catalog, dashboard } = state.data;
  const { pickup_locations } = dashboard;
  const cartInfo = getCartMetrics();
  const waitMin = getLocationWaitMinutes(state.selectedLocation);
  const locObj = pickup_locations.find(l => l.code === state.selectedLocation) || { name: 'Brum' };

  const cartEntries = Object.entries(state.cart)
    .map(([pid, qty]) => ({ product: catalog.find(p => p.id === Number(pid)), qty }))
    .filter(x => x.product && x.qty > 0);

  const isPixSelected = state.selectedPayment === 'PIX' || state.selectedPayment === 'COMBO_DIA' || state.selectedPayment === 'PITSTOP_WALLET' || state.selectedPayment === 'RESIDENCY_VOUCHER';
  const isCounterSelected = state.selectedPayment === 'BALCAO';

  return `
    <div class="px-5 pb-6 flex-1 flex flex-col justify-between space-y-4">
      <div class="space-y-4">
        <!-- Back Header from PDF: "← Pagamento" -->
        <div class="flex items-center justify-between pt-1">
          <div class="flex items-center gap-3">
            <button onclick="navigateStudent('home');"
              class="w-10 h-10 rounded-full bg-[#EFE6DC] hover:bg-[#E5D9CC] text-[#1C1C1E] flex items-center justify-center transition">
              ${ICONS.arrowLeft}
            </button>
            <h1 class="text-2xl font-extrabold text-[#1C1C1E] tracking-tight">Pagamento</h1>
          </div>
          <span class="text-xs font-semibold text-neutral-500">Retirada ${state.selectedTimeSlot}</span>
        </div>

        <!-- Single White Summary Card from PDF -->
        <div class="p-5 rounded-3xl bg-white shadow-card space-y-3.5">
          <div class="space-y-3">
            ${cartEntries.map(({ product, qty }) => `
              <div class="flex items-center justify-between gap-3">
                <div class="flex items-center gap-3 min-w-0">
                  <div class="w-10 h-10 rounded-2xl bg-[#F4ECE1] flex items-center justify-center text-lg shrink-0">
                    ${product.icon || '🍴'}
                  </div>
                  <div class="min-w-0">
                    <p class="text-sm font-bold text-[#1C1C1E] truncate">${product.name}</p>
                    <p class="text-xs text-neutral-400">${formatBRL(product.price)} cada</p>
                  </div>
                </div>

                <div class="flex items-center gap-2 shrink-0">
                  <div class="flex items-center gap-1.5 bg-[#FAF3EB] px-2.5 py-1 rounded-xl text-xs font-bold text-neutral-700">
                    <button onclick="updateCart(${product.id}, -1);" class="w-4 h-4 flex items-center justify-center text-neutral-400 hover:text-[#1C1C1E]">-</button>
                    <span class="font-mono">${qty}x</span>
                    <button onclick="updateCart(${product.id}, 1);" class="w-4 h-4 flex items-center justify-center text-[#EE651D]">+</button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

          ${cartInfo.discount > 0 ? `
            <div class="pt-2 border-t border-dashed border-neutral-200 flex items-center justify-between text-xs text-[#2E7D32] font-bold">
              <span>🏷️ ${cartInfo.discountLabel}</span>
              <span>- ${formatBRL(cartInfo.discount)}</span>
            </div>
          ` : ''}

          <!-- Bottom Row of Summary Card from PDF: "Brum · pronto em ~8 min" | "R$ [total]" -->
          <div class="pt-3 border-t border-neutral-100 flex items-center justify-between">
            <span class="text-sm font-semibold text-neutral-500">
              ${locObj.name} · pronto em ~${waitMin} min
            </span>
            <span class="text-xl font-extrabold text-[#1C1C1E]">
              ${formatBRL(cartInfo.total)}
            </span>
          </div>
        </div>

        <!-- Quick Identification / Persona Selector (Mariana, Lucas, Rafael) -->
        <div class="p-3.5 rounded-2xl bg-[#EFE6DC]/70 space-y-2">
          <div class="flex items-center justify-between">
            <label for="checkout-student-name-input" class="text-[11px] font-bold text-neutral-600 uppercase tracking-wider">
              Identificação na Senha
            </label>
            <div class="flex items-center gap-1">
              ${[
                { code: 'LUCAS', label: 'Lucas' },
                { code: 'MARIANA', label: 'Mariana' },
                { code: 'RAFAEL', label: 'Rafael' }
              ].map(p => `
                <button onclick="selectPersonaProfile('${p.code}');"
                  class="px-2 py-0.5 rounded-full text-[10px] font-bold transition ${
                    state.activePersonaCode === p.code
                      ? 'bg-[#EE651D] text-white'
                      : 'bg-white text-neutral-600 hover:bg-neutral-100'
                  }">
                  ${p.label}
                </button>
              `).join('')}
            </div>
          </div>
          <input id="checkout-student-name-input" type="text" value="${state.studentName}"
            oninput="state.studentName = this.value;"
            placeholder="Seu nome para chamada no balcão"
            class="w-full px-3.5 py-2 rounded-xl bg-white text-xs font-bold text-[#1C1C1E] border border-[#E6DDD2] focus:outline-none focus:border-[#EE651D]" />
        </div>

        <!-- "Como quer pagar?" from PDF -->
        <div class="space-y-2.5">
          <h2 class="text-base font-extrabold text-[#1C1C1E]">Como quer pagar?</h2>

          <!-- Option 1: Pagar agora com Pix (Mais rápido) -->
          <div onclick="state.selectedPayment = state.activeCouponCode || 'PIX'; renderStudentOnly();"
            class="p-4 rounded-3xl transition-all cursor-pointer flex items-center justify-between gap-3 ${
              isPixSelected
                ? 'bg-[#FFF8F3] border-2 border-[#EE651D] shadow-sm'
                : 'bg-white border-2 border-transparent hover:border-[#E6DDD2]'
            }">
            <div class="flex items-center gap-3.5">
              <div class="w-11 h-11 rounded-2xl bg-[#FFF0E6] text-[#EE651D] flex items-center justify-center text-lg shrink-0 font-bold">
                ⚡
              </div>
              <div>
                <p class="text-sm font-extrabold text-[#1C1C1E]">Pagar agora com Pix</p>
                <p class="text-xs text-neutral-500">Só mostrar a senha e retirar</p>
              </div>
            </div>
            <span class="px-2.5 py-1 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-[11px] font-extrabold shrink-0">
              Mais rápido
            </span>
          </div>

          <!-- Option 2: Pagar na retirada -->
          <div onclick="state.selectedPayment = 'BALCAO'; renderStudentOnly();"
            class="p-4 rounded-3xl transition-all cursor-pointer flex items-center justify-between gap-3 ${
              isCounterSelected
                ? 'bg-[#FFF8F3] border-2 border-[#EE651D] shadow-sm'
                : 'bg-white border-2 border-transparent hover:border-[#E6DDD2]'
            }">
            <div class="flex items-center gap-3.5">
              <div class="w-11 h-11 rounded-2xl bg-[#F4ECE1] text-[#1C1C1E] flex items-center justify-center text-lg shrink-0">
                💳
              </div>
              <div>
                <p class="text-sm font-extrabold text-[#1C1C1E]">Pagar na retirada</p>
                <p class="text-xs text-neutral-500">Na maquininha do balcão</p>
              </div>
            </div>
          </div>

          <!-- Coupon / Strategy Banner (Links to Tela 4 Descontos & Cap. 5 OCP) -->
          <div class="flex items-center justify-between px-3.5 py-2 rounded-2xl bg-white border border-[#E6DDD2] text-xs">
            <span class="text-neutral-600 font-medium">
              🏷️ ${state.activeCouponCode ? `<strong class="text-[#EE651D]">${cartInfo.discountLabel}</strong> ativo` : 'Tem cupom ou voucher estudantil?'}
            </span>
            <button onclick="navigateStudent('discounts');" class="font-extrabold text-[#EE651D] hover:underline">
              ${state.activeCouponCode ? 'Trocar cupom' : 'Ver cupons →'}
            </button>
          </div>
        </div>
      </div>

      <!-- Sticky Bottom CTA from PDF: "Confirmar pedido" -->
      <div class="pt-2">
        <button onclick="handleOrderSubmit();"
          class="w-full py-4 px-6 rounded-2xl bg-[#EE651D] hover:bg-[#D95614] text-white font-extrabold text-base transition shadow-orangeGlow text-center">
          Confirmar pedido
        </button>
      </div>
    </div>
  `;
}

// --- TELA 3: PIX & SENHA ("← Pix" + QR Code + SUA SENHA PS-105) ---
function renderStudentPixScreen() {
  const order = state.currentOrder || (state.data.dashboard.orders && state.data.dashboard.orders[0]);
  const ticketCode = order ? order.ticket_code : 'PS-105';
  const locName = order ? order.location_name : 'Brum';
  const status = order ? order.status : 'QUEUED';
  const isReady = status === 'READY';
  const isPreparing = status === 'PREPARING';
  const isDelivered = status === 'DELIVERED';

  let statusLabel = 'Aguardando pagamento...';
  let statusDotClass = 'bg-[#EE651D] animate-ping';
  let statusBgClass = 'bg-[#EFE6DC] text-[#A15C2F]';

  if (isReady) {
    statusLabel = `PRONTO! Retire agora no balcão ${locName}`;
    statusDotClass = 'bg-[#2E7D32] animate-ping';
    statusBgClass = 'bg-[#E8F5E9] text-[#1B5E20] ring-2 ring-[#2E7D32]/30';
  } else if (isPreparing) {
    statusLabel = `Em preparo na estufa (ciclo 2 min) · Balcão ${locName}`;
    statusDotClass = 'bg-[#EE651D] animate-pulse';
    statusBgClass = 'bg-[#FFF0E6] text-[#EE651D]';
  } else if (isDelivered) {
    statusLabel = `Pedido entregue no balcão ${locName}. Bom lanche!`;
    statusDotClass = 'bg-[#2E7D32]';
    statusBgClass = 'bg-[#E8F5E9] text-[#1B5E20]';
  } else if (state.pixPaymentConfirmed) {
    statusLabel = `Pagamento confirmado! Na fila do balcão ${locName}...`;
    statusDotClass = 'bg-[#2E7D32]';
    statusBgClass = 'bg-[#E8F5E9] text-[#1B5E20]';
  }

  return `
    <div class="px-5 pb-6 flex-1 flex flex-col justify-between space-y-4">
      <div class="space-y-4">
        <!-- Back Header from PDF: "← Pix" -->
        <div class="flex items-center justify-between pt-1">
          <div class="flex items-center gap-3">
            <button onclick="navigateStudent('home');"
              class="w-10 h-10 rounded-full bg-[#EFE6DC] hover:bg-[#E5D9CC] text-[#1C1C1E] flex items-center justify-center transition">
              ${ICONS.arrowLeft}
            </button>
            <h1 class="text-2xl font-extrabold text-[#1C1C1E] tracking-tight">Pix</h1>
          </div>
          ${order ? `
            <span class="text-xs font-bold text-neutral-500">${formatBRL(order.final_amount)} · ${order.time_slot}</span>
          ` : ''}
        </div>

        <!-- White QR Code Card from PDF -->
        <div class="p-5 rounded-3xl bg-white shadow-card flex flex-col items-center text-center space-y-4">
          <!-- Green Security Pill from PDF -->
          <div class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-xs font-bold">
            <span>🔒 Pagamento seguro · via API Pix</span>
          </div>

          <!-- Crisp Simulated QR Code Box from PDF -->
          <div onclick="copyPixCode();"
            title="Clique para simular leitura do QR Code"
            class="w-40 h-40 rounded-3xl border-2 border-[#E6DDD2] bg-[#FAF3EB] p-3 flex flex-col items-center justify-center cursor-pointer hover:border-[#EE651D] transition group">
            <svg viewBox="0 0 100 100" class="w-28 h-28 text-[#1C1C1E] group-hover:scale-105 transition-transform" fill="currentColor">
              <rect x="8" y="8" width="26" height="26" rx="4" fill="none" stroke="currentColor" stroke-width="6"/>
              <rect x="15" y="15" width="12" height="12" rx="2"/>
              <rect x="66" y="8" width="26" height="26" rx="4" fill="none" stroke="currentColor" stroke-width="6"/>
              <rect x="73" y="15" width="12" height="12" rx="2"/>
              <rect x="8" y="66" width="26" height="26" rx="4" fill="none" stroke="currentColor" stroke-width="6"/>
              <rect x="15" y="73" width="12" height="12" rx="2"/>
              <rect x="42" y="12" width="7" height="7"/><rect x="52" y="18" width="7" height="14"/>
              <rect x="42" y="34" width="16" height="7"/><rect x="12" y="44" width="14" height="7"/>
              <rect x="34" y="46" width="12" height="12" rx="2" fill="#EE651D"/>
              <rect x="52" y="44" width="8" height="16"/><rect x="68" y="42" width="18" height="7"/>
              <rect x="42" y="66" width="14" height="8"/><rect x="64" y="58" width="10" height="14"/>
              <rect x="80" y="64" width="10" height="10"/><rect x="58" y="78" width="16" height="12"/>
              <rect x="80" y="82" width="12" height="8"/>
            </svg>
            <span class="text-[10px] font-mono text-neutral-400 mt-1">Toque para aprovar</span>
          </div>

          <p class="text-xs text-neutral-400 font-medium">Ou copie o código Pix:</p>

          <!-- Copyable Code Box from PDF -->
          <div class="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF3EB] border border-[#E6DDD2] font-mono text-[11px] text-neutral-500 truncate select-all">
            00020126580014br.gov.bcb.pix0136pitstop-cesar-${ticketCode.toLowerCase()}
          </div>

          <!-- Orange "Copiar código" Button from PDF -->
          <button onclick="copyPixCode();"
            class="px-6 py-2.5 rounded-xl bg-[#EE651D] hover:bg-[#D95614] text-white text-xs font-extrabold transition shadow-sm">
            ${state.pixPaymentConfirmed ? '✓ Código copiado (Pago)' : 'Copiar código'}
          </button>
        </div>

        <!-- Status Pill Bar from PDF: "● Aguardando pagamento..." -->
        <div class="py-3 px-4 rounded-2xl ${statusBgClass} text-xs font-bold flex items-center justify-center gap-2 transition-all">
          <span class="w-2 h-2 rounded-full ${statusDotClass}"></span>
          <span>${statusLabel}</span>
        </div>
      </div>

      <!-- Dark Charcoal Ticket Card from PDF: "SUA SENHA | PS-105" -->
      <div class="p-5 rounded-3xl bg-[#1C1C1E] text-white flex items-center justify-between shadow-xl">
        <div>
          <p class="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400">SUA SENHA</p>
          <p class="text-xs text-neutral-300 mt-0.5">
            ${isReady
              ? `Pronto! Retire no balcão ${locName}`
              : state.pixPaymentConfirmed || isPreparing
              ? `Liberada · Retirada no balcão ${locName}`
              : 'Liberada após o pagamento'}
          </p>
        </div>
        <span class="text-3xl sm:text-4xl font-extrabold text-[#EE651D] tracking-tight font-mono">
          ${ticketCode}
        </span>
      </div>
    </div>
  `;
}

// --- TELA 4: MENU DO ALUNO ("Olá, [nome] 👋" + 2x2 Grid: Horários, Pedidos, Perfil, Descontos) ---
function renderStudentMenuHubScreen() {
  const shortName = getStudentShortName();
  const myOrders = getStudentActiveOrders();

  return `
    <div class="px-5 pb-6 flex-1 flex flex-col justify-between space-y-5">
      <div class="space-y-5 pt-2">
        <!-- Greeting from PDF: "Olá, [nome] 👋" -->
        <div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-[#1C1C1E] tracking-tight">
            Olá, ${shortName} 👋
          </h1>
          <p class="text-xs text-neutral-500 mt-1">
            Aproveite seus 15 minutos de intervalo sem fila.
          </p>
        </div>

        <!-- 2x2 Action Grid from PDF -->
        <div class="grid grid-cols-2 gap-3.5">
          <!-- Card 1: Horários -->
          <button onclick="navigateStudent('hours');"
            class="p-5 rounded-3xl bg-white hover:border-[#EE651D] border border-transparent text-left shadow-card transition flex flex-col justify-between min-h-[132px] group">
            <div class="w-11 h-11 rounded-2xl bg-[#FAF3EB] flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
              🕒
            </div>
            <div class="mt-4">
              <h3 class="text-base font-extrabold text-[#1C1C1E]">Horários</h3>
              <p class="text-xs text-neutral-400 mt-0.5">Quando abre e fecha</p>
            </div>
          </button>

          <!-- Card 2: Pedidos -->
          <button onclick="navigateStudent('orders-history');"
            class="p-5 rounded-3xl bg-white hover:border-[#EE651D] border border-transparent text-left shadow-card transition flex flex-col justify-between min-h-[132px] relative group">
            <div class="flex items-center justify-between w-full">
              <div class="w-11 h-11 rounded-2xl bg-[#FAF3EB] flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
                🧾
              </div>
              ${myOrders.length > 0 ? `
                <span class="px-2 py-0.5 rounded-full bg-[#1C1C1E] text-white font-mono text-[10px] font-bold">
                  ${myOrders.length}
                </span>
              ` : ''}
            </div>
            <div class="mt-4">
              <h3 class="text-base font-extrabold text-[#1C1C1E]">Pedidos</h3>
              <p class="text-xs text-neutral-400 mt-0.5">Seu histórico</p>
            </div>
          </button>

          <!-- Card 3: Perfil (Personas do Estudo) -->
          <button onclick="navigateStudent('profile-personas');"
            class="p-5 rounded-3xl bg-white hover:border-[#EE651D] border border-transparent text-left shadow-card transition flex flex-col justify-between min-h-[132px] group">
            <div class="w-11 h-11 rounded-2xl bg-[#FAF3EB] flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
              👤
            </div>
            <div class="mt-4">
              <h3 class="text-base font-extrabold text-[#1C1C1E]">Perfil</h3>
              <p class="text-xs text-neutral-400 mt-0.5">Seus dados & personas</p>
            </div>
          </button>

          <!-- Card 4: Descontos (Solid Orange Card with "Novo" Badge from PDF!) -->
          <button onclick="navigateStudent('discounts');"
            class="p-5 rounded-3xl bg-[#EE651D] hover:bg-[#D95614] text-white text-left shadow-orangeGlow transition flex flex-col justify-between min-h-[132px] relative group">
            <div class="flex items-center justify-between w-full">
              <div class="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
                🏷️
              </div>
              <span class="px-2.5 py-0.5 rounded-full bg-[#1C1C1E] text-white text-[10px] font-extrabold">
                Novo
              </span>
            </div>
            <div class="mt-4">
              <h3 class="text-base font-extrabold text-white">Descontos</h3>
              <p class="text-xs text-white/85 mt-0.5">Cupons ativos</p>
            </div>
          </button>
        </div>

        <!-- Quick Active Persona Info Box -->
        <div class="p-4 rounded-3xl bg-[#EFE6DC]/80 flex items-center justify-between gap-3">
          <div>
            <p class="text-[10px] font-extrabold uppercase tracking-wider text-[#B45309]">Persona Ativa no Protótipo</p>
            <p class="text-xs font-bold text-[#1C1C1E] mt-0.5">${state.studentName}</p>
            <p class="text-[11px] text-neutral-600">Unidade preferida: <strong>${state.selectedLocation}</strong> · Turno <strong>${state.selectedTimeSlot}</strong></p>
          </div>
          <button onclick="navigateStudent('profile-personas');" class="px-3 py-1.5 rounded-xl bg-white text-xs font-bold text-[#1C1C1E] shadow-sm shrink-0">
            Trocar
          </button>
        </div>
      </div>

      <!-- Sticky Bottom CTA from PDF: "Fazer um pedido" -->
      <div class="pt-2">
        <button onclick="navigateStudent('home');"
          class="w-full py-4 px-6 rounded-2xl bg-[#EE651D] hover:bg-[#D95614] text-white font-extrabold text-base transition shadow-orangeGlow text-center">
          Fazer um pedido
        </button>
      </div>
    </div>
  `;
}

// --- SUBTELA 4A: HORÁRIOS & CAPACIDADE REAL (Personas PDF: 200 alunos, 4 salgados/ciclo 2m) ---
function renderStudentHoursScreen() {
  const { hourly_chart, pickup_locations } = state.data.dashboard;

  return `
    <div class="px-5 pb-6 flex-1 flex flex-col justify-between space-y-4">
      <div class="space-y-4">
        <div class="flex items-center gap-3 pt-1">
          <button onclick="navigateStudent('menu-hub');"
            class="w-10 h-10 rounded-full bg-[#EFE6DC] hover:bg-[#E5D9CC] text-[#1C1C1E] flex items-center justify-center transition">
            ${ICONS.arrowLeft}
          </button>
          <div>
            <h1 class="text-xl font-extrabold text-[#1C1C1E]">Horários & Capacidade</h1>
            <p class="text-xs text-neutral-500">Funcionamento das 07:30 às 20:30 · Agendamento por capacidade</p>
          </div>
        </div>

        <!-- Real Capacity Rule from Personas PDF -->
        <div class="p-4 rounded-3xl bg-[#1C1C1E] text-white space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-extrabold text-[#EE651D] uppercase tracking-wider">⚡ Capacidade Real da Cantina</span>
            <span class="font-mono text-xs bg-white/10 px-2 py-0.5 rounded-lg text-white">Ciclo: 02:00</span>
          </div>
          <p class="text-xs text-neutral-300 leading-relaxed">
            No intervalo de <strong>15 minutos</strong> saem ~<strong>200 alunos</strong> para <strong>2 atendentes</strong>. Cada máquina aquece <strong>4 salgados a cada 2 minutos</strong>. Agendar garante sua vaga!
          </p>
        </div>

        <!-- Slots Occupation List -->
        <div class="p-4 rounded-3xl bg-white shadow-card space-y-3">
          <h3 class="text-xs font-extrabold uppercase tracking-wider text-neutral-400">Vagas por Horário de Retirada</h3>
          <div class="space-y-2.5">
            ${hourly_chart.map(slot => {
              const capacityLimit = 28;
              const remaining = Math.max(2, capacityLimit - slot.actual_orders);
              const pct = Math.min(100, Math.round((slot.actual_orders / capacityLimit) * 100));
              const isSelected = state.selectedTimeSlot === slot.time_slot;

              return `
                <div onclick="state.selectedTimeSlot = '${slot.time_slot}'; navigateStudent('home');"
                  class="p-2.5 rounded-2xl border cursor-pointer transition ${
                    isSelected ? 'border-[#EE651D] bg-[#FFF8F3]' : 'border-neutral-100 hover:border-neutral-200'
                  }">
                  <div class="flex items-center justify-between text-xs font-bold">
                    <span class="text-[#1C1C1E]">${slot.label}</span>
                    <span class="font-mono ${remaining <= 6 ? 'text-[#EE651D]' : 'text-[#2E7D32]'}">
                      ${remaining} vagas livres
                    </span>
                  </div>
                  <div class="w-full h-2 rounded-full bg-neutral-100 mt-1.5 overflow-hidden">
                    <div class="h-full rounded-full ${pct > 80 ? 'bg-[#EE651D]' : 'bg-[#1C1C1E]'}" style="width: ${pct}%"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Units Hours -->
        <div class="grid grid-cols-3 gap-2">
          ${pickup_locations.map(loc => `
            <div class="p-3 rounded-2xl bg-white shadow-card text-center">
              <p class="text-xs font-extrabold text-[#1C1C1E]">${loc.name}</p>
              <p class="text-[10px] text-neutral-400 mt-0.5">07:30 – 20:30</p>
              <p class="text-[11px] font-bold text-[#EE651D] mt-1">~${getLocationWaitMinutes(loc.code)} min</p>
            </div>
          `).join('')}
        </div>
      </div>

      <button onclick="navigateStudent('home');"
        class="w-full py-4 px-6 rounded-2xl bg-[#EE651D] hover:bg-[#D95614] text-white font-extrabold text-base transition shadow-orangeGlow">
        Escolher lanche neste horário
      </button>
    </div>
  `;
}

// --- SUBTELA 4B: PEDIDOS & SENHAS AO VIVO ("🧾 Pedidos") ---
function renderStudentOrdersHistoryScreen() {
  const myOrders = getStudentActiveOrders();

  return `
    <div class="px-5 pb-6 flex-1 flex flex-col justify-between space-y-4">
      <div class="space-y-4">
        <div class="flex items-center gap-3 pt-1">
          <button onclick="navigateStudent('menu-hub');"
            class="w-10 h-10 rounded-full bg-[#EFE6DC] hover:bg-[#E5D9CC] text-[#1C1C1E] flex items-center justify-center transition">
            ${ICONS.arrowLeft}
          </button>
          <div>
            <h1 class="text-xl font-extrabold text-[#1C1C1E]">Seus Pedidos & Senhas</h1>
            <p class="text-xs text-neutral-500">Acompanhe o preparo e apresente a senha no balcão</p>
          </div>
        </div>

        <div class="space-y-3 max-h-[430px] overflow-y-auto no-scrollbar">
          ${myOrders.length === 0 ? `
            <div class="p-8 rounded-3xl bg-white text-center space-y-2 shadow-card">
              <p class="text-2xl">🧾</p>
              <p class="text-sm font-bold text-[#1C1C1E]">Nenhum pedido para esta persona ainda</p>
              <p class="text-xs text-neutral-400">Faça um pedido rápido em menos de 1 minuto!</p>
            </div>
          ` : myOrders.map(order => {
            const isReady = order.status === 'READY';
            const isPreparing = order.status === 'PREPARING';
            const isDelivered = order.status === 'DELIVERED';

            return `
              <div onclick="state.currentOrder = state.data.dashboard.orders.find(o => o.id === ${order.id}); navigateStudent('pix');"
                class="p-4 rounded-3xl bg-white border-2 cursor-pointer transition shadow-card ${
                  isReady ? 'border-[#EE651D]' : 'border-transparent hover:border-[#E6DDD2]'
                }">
                <div class="flex items-center justify-between">
                  <span class="font-mono text-lg font-extrabold text-[#EE651D]">${order.ticket_code}</span>
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                    isReady
                      ? 'bg-[#EE651D] text-white animate-pulse'
                      : isPreparing
                      ? 'bg-[#1C1C1E] text-white'
                      : isDelivered
                      ? 'bg-[#E8F5E9] text-[#2E7D32]'
                      : 'bg-[#F4ECE1] text-neutral-700'
                  }">
                    ${isReady ? 'PRONTO NO BALCÃO' : isPreparing ? 'EM PREPARO' : isDelivered ? 'ENTREGUE' : 'RECEBIDO'}
                  </span>
                </div>
                <p class="text-xs font-bold text-[#1C1C1E] mt-1">
                  Balcão ${order.location_name} · Horário ${order.time_slot}
                </p>
                <div class="mt-2 pt-2 border-t border-neutral-100 text-xs text-neutral-500 space-y-0.5">
                  ${order.items.map(i => `<div>${i.quantity}x ${i.product_name}</div>`).join('')}
                </div>
                <div class="mt-2 flex items-center justify-between text-xs font-extrabold text-[#1C1C1E]">
                  <span>${order.payment_method}</span>
                  <span>${formatBRL(order.final_amount)}</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <button onclick="navigateStudent('home');"
        class="w-full py-4 px-6 rounded-2xl bg-[#EE651D] hover:bg-[#D95614] text-white font-extrabold text-base transition shadow-orangeGlow">
        Novo pedido
      </button>
    </div>
  `;
}

// --- SUBTELA 4C: PERFIL & PERSONAS DO ESTUDO ("👤 Perfil") ---
function renderStudentPersonasScreen() {
  const personas = (state.data && state.data.dashboard && state.data.dashboard.personas) || [];

  return `
    <div class="px-5 pb-6 flex-1 flex flex-col justify-between space-y-4">
      <div class="space-y-4">
        <div class="flex items-center gap-3 pt-1">
          <button onclick="navigateStudent('menu-hub');"
            class="w-10 h-10 rounded-full bg-[#EFE6DC] hover:bg-[#E5D9CC] text-[#1C1C1E] flex items-center justify-center transition">
            ${ICONS.arrowLeft}
          </button>
          <div>
            <h1 class="text-xl font-extrabold text-[#1C1C1E]">Perfil & Personas</h1>
            <p class="text-xs text-neutral-500">Simule a jornada de cada público-alvo mapeado</p>
          </div>
        </div>

        <div class="space-y-3">
          ${personas.map(p => {
            const isSelected = state.activePersonaCode === p.code;
            return `
              <div onclick="selectPersonaProfile('${p.code}');"
                class="p-4 rounded-3xl cursor-pointer transition border-2 shadow-card ${
                  isSelected
                    ? 'bg-[#FFF8F3] border-[#EE651D]'
                    : 'bg-white border-transparent hover:border-[#E6DDD2]'
                }">
                <div class="flex items-center justify-between">
                  <div>
                    <span class="text-[10px] font-extrabold uppercase tracking-wider text-[#EE651D]">${p.role}</span>
                    <h3 class="text-sm font-extrabold text-[#1C1C1E]">${p.name}</h3>
                  </div>
                  ${isSelected ? `
                    <span class="px-2.5 py-0.5 rounded-full bg-[#EE651D] text-white text-[10px] font-bold">Ativo</span>
                  ` : `
                    <span class="text-xs font-bold text-neutral-400">Simular →</span>
                  `}
                </div>
                <p class="text-xs italic text-neutral-600 mt-1.5">"${p.quote}"</p>
                <p class="text-[11px] text-neutral-400 mt-1">${p.goal}</p>
              </div>
            `;
          }).join('')}

          <!-- Patrícia Card (Atendente) -->
          <div onclick="switchViewMode('staff');"
            class="p-4 rounded-3xl bg-[#1C1C1E] text-white cursor-pointer hover:brightness-110 transition">
            <div class="flex items-center justify-between">
              <div>
                <span class="text-[10px] font-extrabold uppercase tracking-wider text-[#EE651D]">Persona Operacional</span>
                <h3 class="text-sm font-extrabold text-white">👩‍🍳 Patrícia · A Atendente da Cantina</h3>
              </div>
              <span class="px-2.5 py-1 rounded-xl bg-[#EE651D] text-white text-[10px] font-bold">Ver Painel →</span>
            </div>
            <p class="text-xs italic text-neutral-300 mt-1.5">"Preciso organizar os pedidos para entregar tudo certo e no horário."</p>
          </div>
        </div>
      </div>

      <button onclick="navigateStudent('home');"
        class="w-full py-4 px-6 rounded-2xl bg-[#EE651D] hover:bg-[#D95614] text-white font-extrabold text-base transition shadow-orangeGlow">
        Ir para o cardápio como ${getStudentShortName()}
      </button>
    </div>
  `;
}

// --- SUBTELA 4D: DESCONTOS & CUPONS ATIVOS ("🏷️ Descontos" + Cap. 5 OCP PaymentStrategy) ---
function renderStudentDiscountsScreen() {
  const coupons = [
    {
      code: 'COMBO_DIA',
      badge: '15% OFF',
      title: 'Combo do Dia (Café + Pão de Queijo)',
      desc: 'Ideal para a persona Mariana controlar gastos e garantir lanche + café.',
      strategyClass: 'DailyComboDiscountPayment'
    },
    {
      code: 'RESIDENCY_VOUCHER',
      badge: '12% OFF',
      title: 'Voucher Monitoria / Residência CESAR',
      desc: 'Prova viva do Princípio Aberto/Fechado (OCP): nova classe sem alterar OrderService!',
      strategyClass: 'ResidencyVoucherPayment'
    },
    {
      code: 'PITSTOP_WALLET',
      badge: '5% OFF',
      title: 'Saldo Carteira PitStop CESAR',
      desc: 'Cashback automático para alunos com créditos pré-carregados.',
      strategyClass: 'PitStopWalletPayment'
    }
  ];

  return `
    <div class="px-5 pb-6 flex-1 flex flex-col justify-between space-y-4">
      <div class="space-y-4">
        <div class="flex items-center gap-3 pt-1">
          <button onclick="navigateStudent('menu-hub');"
            class="w-10 h-10 rounded-full bg-[#EFE6DC] hover:bg-[#E5D9CC] text-[#1C1C1E] flex items-center justify-center transition">
            ${ICONS.arrowLeft}
          </button>
          <div>
            <h1 class="text-xl font-extrabold text-[#1C1C1E]">Descontos & Cupons</h1>
            <p class="text-xs text-neutral-500">Polimorfismo & Strategy (Cap. 5 OCP/LSP)</p>
          </div>
        </div>

        <div class="space-y-3">
          ${coupons.map(c => {
            const isActive = state.activeCouponCode === c.code;
            return `
              <div onclick="activateCouponStrategy('${c.code}', '${c.title}');"
                class="p-4 rounded-3xl cursor-pointer transition border-2 shadow-card ${
                  isActive
                    ? 'bg-[#FFF8F3] border-[#EE651D]'
                    : 'bg-white border-transparent hover:border-[#E6DDD2]'
                }">
                <div class="flex items-center justify-between">
                  <span class="px-2.5 py-0.5 rounded-full bg-[#EE651D] text-white text-xs font-extrabold">${c.badge}</span>
                  <span class="font-mono text-[10px] text-neutral-400">${c.strategyClass}</span>
                </div>
                <h3 class="text-sm font-extrabold text-[#1C1C1E] mt-2">${c.title}</h3>
                <p class="text-xs text-neutral-500 mt-1">${c.desc}</p>
                <div class="mt-3 pt-2 border-t border-neutral-100 flex items-center justify-between text-xs font-bold">
                  <span class="${isActive ? 'text-[#2E7D32]' : 'text-neutral-400'}">
                    ${isActive ? '✓ Cupom ativo no seu checkout' : 'Toque para ativar no pedido'}
                  </span>
                  <span class="text-[#EE651D]">${isActive ? 'Desativar' : 'Ativar →'}</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <button onclick="navigateStudent('checkout');"
        class="w-full py-4 px-6 rounded-2xl bg-[#EE651D] hover:bg-[#D95614] text-white font-extrabold text-base transition shadow-orangeGlow">
        Ir para o Pagamento
      </button>
    </div>
  `;
}

// --- PRODUCT DETAILS & INGREDIENTS MODAL ---
function renderProductModal() {
  const product = state.selectedProductModal;
  if (!product) return '';
  const inCart = state.cart[product.id] || 0;

  return `
    <div onclick="if (event.target === this) closeProductModal();"
      class="absolute inset-0 z-40 bg-black/45 backdrop-blur-sm rounded-[32px] p-4 flex items-center justify-center fade-in">
      <div class="bg-[#FAF3EB] rounded-3xl w-full max-w-sm p-5 border border-[#E6DDD2] shadow-2xl space-y-4">
        <div class="relative w-full h-44 rounded-2xl overflow-hidden bg-[#F4ECE1]">
          <img src="${product.image_url}" alt="${product.name}" class="w-full h-full object-cover" />
          <button onclick="closeProductModal();"
            class="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 text-[#1C1C1E] flex items-center justify-center shadow-sm">
            ${ICONS.x}
          </button>
          <span class="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-full bg-[#1C1C1E]/85 text-white text-[10px] font-mono font-bold">
            Ciclo de preparo: ~${product.prep_time_min} min
          </span>
        </div>

        <div class="flex items-start justify-between gap-2">
          <div>
            <span class="text-[10px] font-extrabold uppercase tracking-wider text-[#EE651D]">${product.category}</span>
            <h3 class="text-lg font-extrabold text-[#1C1C1E] leading-tight">${product.name}</h3>
          </div>
          <span class="text-lg font-extrabold text-[#1C1C1E] shrink-0">${formatBRL(product.price)}</span>
        </div>

        <p class="text-xs text-neutral-600 leading-relaxed">${product.description}</p>

        <div class="p-3.5 rounded-2xl bg-white border border-[#E6DDD2]">
          <p class="text-[10px] font-extrabold uppercase tracking-wider text-neutral-400 mb-1">Ingredientes</p>
          <p class="text-xs text-neutral-700">${product.ingredients}</p>
        </div>

        <div class="flex items-center justify-between text-xs text-neutral-500">
          <span>Disponibilidade na estufa:</span>
          <strong class="text-[#1C1C1E]">${product.stock} unidades</strong>
        </div>

        <button onclick="updateCart(${product.id}, 1); closeProductModal();"
          class="w-full py-3.5 rounded-2xl bg-[#EE651D] hover:bg-[#D95614] text-white font-extrabold text-sm transition shadow-orangeGlow">
          Adicionar ao pedido (${inCart > 0 ? `${inCart} na sacola` : formatBRL(product.price)})
        </button>
      </div>
    </div>
  `;
}

function renderStudentLoadingHtml() {
  if (!state.studentLoading) return '';
  return `
    <div class="absolute inset-0 bg-[#FAF3EB]/85 backdrop-blur-[2px] z-30 flex items-center justify-center fade-in rounded-[32px]">
      <div class="bg-[#1C1C1E] text-white rounded-2xl px-5 py-3.5 shadow-xl flex items-center gap-3">
        <div class="w-4 h-4 border-2 border-[#EE651D] border-t-transparent rounded-full animate-spin"></div>
        <span class="text-xs font-bold">${state.studentLoading}</span>
      </div>
    </div>
  `;
}

function renderStaffLoadingHtml() {
  if (!state.staffLoading) return '';
  return `
    <div class="absolute inset-0 bg-white/85 backdrop-blur-[2px] z-30 flex items-center justify-center fade-in rounded-[32px]">
      <div class="bg-[#1C1C1E] text-white rounded-2xl px-5 py-3.5 shadow-xl flex items-center gap-3">
        <div class="w-4 h-4 border-2 border-[#EE651D] border-t-transparent rounded-full animate-spin"></div>
        <span class="text-xs font-bold">${state.staffLoading}</span>
      </div>
    </div>
  `;
}

function updateStudentLoadingOverlay() {
  const el = document.getElementById('student-loading-mount');
  if (el) el.innerHTML = renderStudentLoadingHtml();
}

function updateStaffLoadingOverlay() {
  const el = document.getElementById('staff-loading-mount');
  if (el) el.innerHTML = renderStaffLoadingHtml();
}

function updateStudentModalMount() {
  const el = document.getElementById('student-modal-mount');
  if (el) el.innerHTML = renderProductModal();
}

// --- STUDENT CONTAINER ---
function renderStudentSection() {
  return `
    <div class="bg-[#FAF3EB] rounded-[32px] border-4 border-[#1C1C1E]/10 shadow-xl overflow-hidden flex flex-col relative min-h-[680px]">
      ${renderStudentGlobalHeader()}
      <div id="student-loading-mount">${renderStudentLoadingHtml()}</div>

      ${state.studentScreen === 'home' ? renderStudentHomeScreen() : ''}
      ${state.studentScreen === 'checkout' ? renderStudentCheckoutScreen() : ''}
      ${state.studentScreen === 'pix' ? renderStudentPixScreen() : ''}
      ${state.studentScreen === 'menu-hub' ? renderStudentMenuHubScreen() : ''}
      ${state.studentScreen === 'hours' ? renderStudentHoursScreen() : ''}
      ${state.studentScreen === 'orders-history' ? renderStudentOrdersHistoryScreen() : ''}
      ${state.studentScreen === 'profile-personas' ? renderStudentPersonasScreen() : ''}
      ${state.studentScreen === 'discounts' ? renderStudentDiscountsScreen() : ''}

      <div id="student-modal-mount">${renderProductModal()}</div>
    </div>
  `;
}

// ============================================================================
// --- STAFF PANEL (PATRÍCIA - A ATENDENTE DA CANTINA) ---
// ============================================================================

function renderStaffAppHeader() {
  const { summary } = state.data.dashboard;

  return `
    <div class="p-4 sm:p-5 border-b border-neutral-800 bg-[#1C1C1E] text-white">
      <div class="flex flex-wrap items-center justify-between gap-2.5">
        <div class="flex items-center gap-3">
          ${renderPitStopLogoWordmark({ darkBg: true, size: 'base' })}
          <div class="border-l border-neutral-700 pl-3">
            <p class="text-xs font-extrabold text-white">Painel da Patrícia (Atendente)</p>
            <p class="text-[11px] text-neutral-400">2 atendentes · 4 salgados/ciclo de 2 min por máquina</p>
          </div>
        </div>

        <nav class="flex flex-wrap items-center bg-neutral-800 p-1 rounded-2xl text-xs font-bold gap-1">
          <button onclick="switchStaffSection('queue');"
            class="px-3 py-1.5 rounded-xl transition ${state.staffSection === 'queue' ? 'bg-[#EE651D] text-white shadow-sm' : 'text-neutral-400 hover:text-white'}">
            Fila & Preparo (${summary.customers_in_queue})
          </button>
          <button onclick="switchStaffSection('metrics');"
            class="px-3 py-1.5 rounded-xl transition ${state.staffSection === 'metrics' ? 'bg-[#EE651D] text-white shadow-sm' : 'text-neutral-400 hover:text-white'}">
            Capacidade & Horários
          </button>
          <button onclick="switchStaffSection('inventory');"
            class="px-3 py-1.5 rounded-xl transition ${state.staffSection === 'inventory' ? 'bg-[#EE651D] text-white shadow-sm' : 'text-neutral-400 hover:text-white'}">
            Estoque (${summary.out_of_stock_count} falta)
          </button>
        </nav>
      </div>

      ${state.staffAlert ? `
        <div class="mt-3 p-3 rounded-2xl bg-[#EE651D] text-white text-xs flex items-center justify-between shadow-sm font-bold fade-in">
          <div>
            <span>⚡ ${state.staffAlert.title}</span>
            ${state.staffAlert.text ? `<span class="font-normal text-white/90 ml-1.5">— ${state.staffAlert.text}</span>` : ''}
          </div>
          <button onclick="state.staffAlert = null; renderStaffOnly();" class="text-white">${ICONS.x}</button>
        </div>
      ` : ''}
    </div>
  `;
}

function renderStaffOrderCard(order) {
  const isDelayed = order.is_delayed;
  const isReady = order.status === 'READY';
  const isQueued = order.status === 'QUEUED';

  return `
    <div class="p-3 rounded-2xl border transition-all min-w-0 overflow-hidden ${
      isDelayed ? 'bg-rose-50/80 border-rose-200' : 'bg-white border-neutral-100 shadow-sm'
    }">
      <div class="flex items-center justify-between gap-1">
        <span class="font-mono text-xs font-extrabold text-[#EE651D]">${order.ticket_code}</span>
        <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
          isDelayed ? 'bg-rose-600 text-white' : 'bg-[#FAF3EB] text-neutral-700'
        }">
          ${order.time_slot} · ${isDelayed ? `+${order.overdue_minutes}m atraso` : `${order.elapsed_minutes}m`}
        </span>
      </div>

      <div class="mt-1.5">
        <p class="text-xs font-extrabold text-[#1C1C1E] truncate">${order.student_name}</p>
        <p class="text-[10px] text-neutral-500 truncate">
          Balcão <strong>${order.location_name}</strong> · ${order.payment_method}
        </p>
      </div>

      <div class="mt-2 pt-2 border-t border-neutral-100 text-[11px] text-neutral-700 space-y-0.5">
        ${order.items.map(i => `<div class="truncate font-medium">${i.quantity}x ${i.product_name}</div>`).join('')}
      </div>

      <div class="mt-2.5 grid ${isReady ? 'grid-cols-2' : 'grid-cols-1'} gap-1.5">
        ${isReady ? `
          <button onclick="handleReNotifyOrder(${order.id})"
            class="py-1.5 px-2 rounded-xl text-[10px] font-extrabold bg-[#FAF3EB] hover:bg-[#EFE6DC] text-[#EE651D] border border-[#EE651D]/30 transition">
            🔔 Chamar (${order.call_count || 0})
          </button>
          <button onclick="handleAdvanceOrder(${order.id})"
            class="py-1.5 px-2 rounded-xl text-[10px] font-extrabold bg-[#2E7D32] hover:bg-[#1B5E20] text-white transition">
            ✓ Entregue
          </button>
        ` : isQueued ? `
          <button onclick="handleAdvanceOrder(${order.id})"
            class="w-full py-2 px-2.5 rounded-xl text-[11px] font-extrabold bg-[#1C1C1E] hover:bg-neutral-800 text-white transition">
            Aquecer Lote (Ciclo 02:00) →
          </button>
        ` : `
          <button onclick="handleAdvanceOrder(${order.id})"
            class="w-full py-2 px-2.5 rounded-xl text-[11px] font-extrabold bg-[#EE651D] hover:bg-[#D95614] text-white transition">
            Marcar Pronto & Avisar Aluno →
          </button>
        `}
      </div>
    </div>
  `;
}

function renderStaffSection() {
  const { catalog, dashboard } = state.data;
  const { summary, hourly_chart, orders } = dashboard;

  const queuedOrders = orders.filter(o => o.status === 'QUEUED');
  const preparingOrders = orders.filter(o => o.status === 'PREPARING');
  const readyOrders = orders.filter(o => o.status === 'READY');

  return `
    <div class="bg-white rounded-[32px] border border-neutral-200/80 shadow-xl overflow-hidden flex flex-col min-h-[680px] relative">
      ${renderStaffAppHeader()}
      <div id="staff-loading-mount">${renderStaffLoadingHtml()}</div>

      <div class="p-4 sm:p-5 flex-1 min-w-0">
        ${state.staffSection === 'queue' ? `
          <div class="space-y-4">
            <!-- Real Capacity Strip for Patrícia (From Personas PDF) -->
            <div class="p-3.5 rounded-2xl bg-[#FAF3EB] border border-[#E6DDD2] flex flex-wrap items-center justify-between gap-2 text-xs">
              <div class="flex items-center gap-2.5">
                <span class="px-2.5 py-1 rounded-xl bg-[#EE651D] text-white font-mono font-extrabold text-[11px]">02:00 / ciclo</span>
                <span class="text-[#1C1C1E] font-semibold">
                  Ocupação das Estufas: <strong>${summary.active_items_in_ovens || 0} itens ativos</strong> (~${summary.oven_cycles_active || 1} ciclo(s) de 4 salgados)
                </span>
              </div>
              <span class="text-[11px] text-neutral-500 font-medium">Meta: zerar fila em &lt; 15 min</span>
            </div>

            <!-- 3-Stage Kanban (1. Recebido, 2. Em Preparo, 3. Pronto) -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <!-- Col 1: Recebido -->
              <div class="p-3 rounded-3xl bg-[#FAF3EB]/60 border border-[#E6DDD2]/60 flex flex-col">
                <div class="flex justify-between items-center mb-2.5 px-1">
                  <span class="text-xs font-extrabold text-[#1C1C1E]">1. Recebido</span>
                  <span class="px-2 py-0.5 rounded-full bg-neutral-200 text-[#1C1C1E] text-[10px] font-mono font-bold">${queuedOrders.length}</span>
                </div>
                <div class="space-y-2.5 max-h-[480px] overflow-y-auto no-scrollbar">
                  ${queuedOrders.length === 0 ? `<p class="text-xs text-neutral-400 py-12 text-center">Nenhum pedido aguardando</p>` : queuedOrders.map(o => renderStaffOrderCard(o)).join('')}
                </div>
              </div>

              <!-- Col 2: Em Preparo -->
              <div class="p-3 rounded-3xl bg-[#FAF3EB]/60 border border-[#E6DDD2]/60 flex flex-col">
                <div class="flex justify-between items-center mb-2.5 px-1">
                  <span class="text-xs font-extrabold text-[#1C1C1E]">2. Em Preparo (Estufa)</span>
                  <span class="px-2 py-0.5 rounded-full bg-[#1C1C1E] text-white text-[10px] font-mono font-bold">${preparingOrders.length}</span>
                </div>
                <div class="space-y-2.5 max-h-[480px] overflow-y-auto no-scrollbar">
                  ${preparingOrders.length === 0 ? `<p class="text-xs text-neutral-400 py-12 text-center">Estufas livres</p>` : preparingOrders.map(o => renderStaffOrderCard(o)).join('')}
                </div>
              </div>

              <!-- Col 3: Pronto para Retirada -->
              <div class="p-3 rounded-3xl bg-[#FFF8F3] border border-[#EE651D]/30 flex flex-col">
                <div class="flex justify-between items-center mb-2.5 px-1">
                  <span class="text-xs font-extrabold text-[#EE651D]">3. Pronto no Balcão</span>
                  <span class="px-2 py-0.5 rounded-full bg-[#EE651D] text-white text-[10px] font-mono font-bold">${readyOrders.length}</span>
                </div>
                <div class="space-y-2.5 max-h-[480px] overflow-y-auto no-scrollbar">
                  ${readyOrders.length === 0 ? `<p class="text-xs text-neutral-400 py-12 text-center">Aguardando finalização</p>` : readyOrders.map(o => renderStaffOrderCard(o)).join('')}
                </div>
              </div>
            </div>
          </div>
        ` : ''}

        ${state.staffSection === 'metrics' ? `
          <div class="space-y-5">
            <!-- 4 KPI Cards -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div class="p-4 rounded-2xl bg-[#FAF3EB]">
                <p class="text-xs text-neutral-500 font-semibold">Pedidos Ativos</p>
                <p class="text-2xl font-extrabold text-[#1C1C1E] mt-0.5">${summary.customers_in_queue}</p>
                <p class="text-[11px] text-[#EE651D] font-bold">Espera ~${summary.estimated_wait_min} min</p>
              </div>
              <div class="p-4 rounded-2xl bg-[#FAF3EB]">
                <p class="text-xs text-neutral-500 font-semibold">Capacidade Estufa</p>
                <p class="text-2xl font-extrabold text-[#1C1C1E] mt-0.5">4 un.</p>
                <p class="text-[11px] text-neutral-500">por ciclo de 2 min</p>
              </div>
              <div class="p-4 rounded-2xl bg-[#FAF3EB]">
                <p class="text-xs text-neutral-500 font-semibold">Entregues Hoje</p>
                <p class="text-2xl font-extrabold text-[#2E7D32] mt-0.5">${summary.delivered_today_count}</p>
                <p class="text-[11px] text-neutral-500">${formatBRL(summary.revenue_today)}</p>
              </div>
              <div class="p-4 rounded-2xl bg-[#FAF3EB]">
                <p class="text-xs text-neutral-500 font-semibold">Público no Pico</p>
                <p class="text-2xl font-extrabold text-[#1C1C1E] mt-0.5">~200</p>
                <p class="text-[11px] text-neutral-500">alunos em 15 min</p>
              </div>
            </div>

            <!-- Bar Chart of Scheduled Demand vs Capacity -->
            <div class="p-5 rounded-3xl bg-[#FAF3EB]/70 border border-[#E6DDD2]">
              <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div>
                  <h3 class="text-sm font-extrabold text-[#1C1C1E]">Agendamento por Horário vs. Limite Operacional</h3>
                  <p class="text-xs text-neutral-500">Controle de vagas por turno considerando pedidos pelo app e atendimento presencial.</p>
                </div>
                <span class="px-3 py-1 rounded-full bg-[#1C1C1E] text-white text-xs font-mono font-bold">
                  Limite online: 28 pedidos/turno
                </span>
              </div>

              <div class="grid grid-cols-6 gap-3 items-end h-44 pt-4 pb-2 border-b border-[#E6DDD2]">
                ${hourly_chart.map(slot => {
                  const fPct = Math.min(100, Math.round((slot.forecast_orders / 32) * 100));
                  const aPct = Math.min(100, Math.round((slot.actual_orders / 32) * 100));
                  const isPeak = slot.time_slot === '09:45' || slot.time_slot === '15:45';
                  return `
                    <div class="flex flex-col items-center h-full justify-end">
                      <span class="text-[10px] font-mono font-bold text-[#1C1C1E] mb-1">${slot.actual_orders}/${slot.forecast_orders}</span>
                      <div class="w-full flex items-end justify-center gap-1.5 h-32">
                        <div style="height: ${fPct}%" class="w-4 sm:w-6 bg-[#E6DDD2] rounded-t-xl" title="Capacidade prevista"></div>
                        <div style="height: ${aPct}%" class="w-4 sm:w-6 ${isPeak ? 'bg-[#EE651D]' : 'bg-[#1C1C1E]'} rounded-t-xl" title="Agendados"></div>
                      </div>
                      <span class="text-xs font-mono font-bold mt-2 ${isPeak ? 'text-[#EE651D]' : 'text-[#1C1C1E]'}">${slot.time_slot}</span>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>
        ` : ''}

        ${state.staffSection === 'inventory' ? `
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            <div class="lg:col-span-7 space-y-2.5 max-h-[520px] overflow-y-auto no-scrollbar pr-1">
              <h3 class="text-xs font-extrabold uppercase tracking-wider text-neutral-400">Controle de Estoque da Patrícia</h3>
              ${[...catalog].sort((a, b) => a.stock - b.stock).map(item => `
                <div class="p-3 rounded-2xl border border-neutral-100 bg-[#FAF3EB]/50 flex items-center justify-between gap-2">
                  <div class="flex items-center gap-2.5 min-w-0">
                    <span class="text-lg">${item.icon || '🍴'}</span>
                    <div class="min-w-0">
                      <p class="text-xs font-extrabold text-[#1C1C1E] truncate">${item.name}</p>
                      <p class="text-[10px] text-neutral-500">${formatBRL(item.price)} · ${item.category}</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-1.5 shrink-0">
                    <button onclick="handleUpdateStock(${item.id}, ${item.stock - 1})" class="w-6 h-6 rounded-lg bg-white border text-xs font-bold">-</button>
                    <span class="w-7 text-center font-mono text-xs font-extrabold">${item.stock}</span>
                    <button onclick="handleUpdateStock(${item.id}, ${item.stock + 1})" class="w-6 h-6 rounded-lg bg-white border text-xs font-bold">+</button>
                    <button onclick="handleRequestStock(${item.id}, 8)"
                      class="px-2.5 py-1 rounded-xl bg-[#EE651D] text-white text-[10px] font-extrabold">
                      +8 (2 ciclos)
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>

            <div class="lg:col-span-5 p-4 rounded-3xl bg-[#FAF3EB] border border-[#E6DDD2]">
              <h4 class="text-xs font-extrabold uppercase tracking-wider text-[#1C1C1E] mb-3">Novo Produto do Turno</h4>
              <form onsubmit="handleCreateProduct(event)" class="space-y-2.5 text-xs">
                <input name="name" required placeholder="Nome (ex: Sanduíche Natural)" class="w-full px-3 py-2 rounded-xl bg-white border border-[#E6DDD2]" />
                <div class="grid grid-cols-2 gap-2">
                  <select name="category" class="px-2.5 py-2 rounded-xl bg-white border border-[#E6DDD2]">
                    <option value="Salgados & Forno">Salgados & Forno</option>
                    <option value="Almoço do Dia">Almoço do Dia</option>
                    <option value="Doces & Bolos">Doces & Bolos</option>
                    <option value="Bebidas">Bebidas</option>
                  </select>
                  <input name="price" type="number" step="0.5" value="7.50" placeholder="Preço" class="px-2.5 py-2 rounded-xl bg-white border border-[#E6DDD2]" />
                </div>
                <div class="grid grid-cols-2 gap-2">
                  <input name="prep_time" type="number" value="2" placeholder="Preparo (min)" class="px-2.5 py-2 rounded-xl bg-white border border-[#E6DDD2]" />
                  <input name="stock" type="number" value="16" placeholder="Estoque" class="px-2.5 py-2 rounded-xl bg-white border border-[#E6DDD2]" />
                </div>
                <input name="badge" placeholder="Selo (ex: Turno Almoço)" class="w-full px-3 py-2 rounded-xl bg-white border border-[#E6DDD2]" />
                <input name="description" placeholder="Descrição rápida" class="w-full px-3 py-2 rounded-xl bg-white border border-[#E6DDD2]" />
                <input name="ingredients" placeholder="Ingredientes" class="w-full px-3 py-2 rounded-xl bg-white border border-[#E6DDD2]" />
                <input type="hidden" name="image_url" value="/static/images/coxinha.jpg" />
                <button type="submit" class="w-full py-2.5 rounded-xl bg-[#1C1C1E] text-white font-extrabold">
                  Adicionar ao Cardápio
                </button>
              </form>
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

// --- STAFF MOBILE VIEW ---
function renderStaffMobileView() {
  const { orders } = state.data.dashboard;
  const activeOrders = orders.filter(o => o.status !== 'DELIVERED');

  return `
    <div class="max-w-md mx-auto bg-white rounded-[32px] border border-neutral-200 shadow-xl overflow-hidden">
      <div class="p-4 bg-[#1C1C1E] text-white flex items-center justify-between">
        ${renderPitStopLogoWordmark({ darkBg: true, size: 'sm' })}
        <span class="text-xs font-mono text-[#EE651D] font-bold">Balcão Patrícia (${activeOrders.length})</span>
      </div>
      <div class="p-4 space-y-3 max-h-[600px] overflow-y-auto">
        ${activeOrders.map(o => renderStaffOrderCard(o)).join('')}
      </div>
    </div>
  `;
}

// --- TV MODE ---
function renderTvMode() {
  const { orders } = state.data.dashboard;
  const preparingOrders = orders.filter(o => o.status === 'PREPARING' || o.status === 'QUEUED');
  const readyOrders = orders.filter(o => o.status === 'READY');

  return `
    <div class="bg-[#1C1C1E] text-white min-h-[85vh] rounded-[32px] p-8 flex flex-col justify-between border border-neutral-800 shadow-2xl">
      <header class="flex items-center justify-between pb-6 border-b border-neutral-800">
        <div class="flex items-center gap-4">
          ${renderPitStopLogoWordmark({ darkBg: true, size: 'lg' })}
          <span class="text-sm text-neutral-400">Painel de Retirada Expressa · Brum · Tiradentes · Apolo</span>
        </div>
        <div id="tv-live-clock" class="text-3xl font-mono font-extrabold text-[#EE651D]">${state.tvClock}</div>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 my-6 flex-1">
        <div class="p-6 rounded-3xl bg-neutral-900 border border-neutral-800">
          <h2 class="text-lg font-extrabold text-neutral-300 uppercase mb-4">🔥 Em Preparo (${preparingOrders.length})</h2>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
            ${preparingOrders.map(o => `
              <div class="p-4 rounded-2xl bg-[#1C1C1E] border border-neutral-800 text-center">
                <span class="text-2xl font-mono font-extrabold text-white">${o.ticket_code}</span>
                <p class="text-xs text-neutral-400 mt-1 truncate">${o.student_name}</p>
                <span class="text-[10px] font-mono text-[#EE651D]">${o.location_name}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="p-6 rounded-3xl bg-neutral-900 border-2 border-[#EE651D] tv-glow">
          <h2 class="text-lg font-extrabold text-[#EE651D] uppercase mb-4">✅ Pronto no Balcão (${readyOrders.length})</h2>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
            ${readyOrders.map(o => `
              <div class="p-4 rounded-2xl bg-[#EE651D] text-white text-center shadow-lg">
                <span class="text-3xl font-mono font-black">${o.ticket_code}</span>
                <p class="text-xs font-bold mt-1 truncate">${o.student_name}</p>
                <span class="inline-block text-[10px] font-mono bg-[#1C1C1E] text-white px-2 py-0.5 rounded-full mt-1">
                  Balcão ${o.location_name}
                </span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <footer class="pt-4 border-t border-neutral-800 flex justify-between text-xs text-neutral-400">
        <span>Peça antes. Retire na hora. Aproveite seu intervalo de 15 minutos.</span>
        <span class="font-mono text-[#EE651D]">CESAR School · PitStop V2</span>
      </footer>
    </div>
  `;
}

// ============================================================================
// --- CHAPTER 5 ARCHITECTURE & LIVE AST METRICS VIEW ---
// ============================================================================

function renderChapter5View() {
  const ch5 = state.data.chapter5;
  if (!ch5) return '';
  const before = ch5.comparison.before_go_horse;
  const afterList = ch5.comparison.after_refactored;

  return `
    <div class="space-y-6">
      <div class="p-6 rounded-[32px] bg-[#1C1C1E] text-white flex flex-wrap items-center justify-between gap-4">
        <div>
          <span class="text-xs font-extrabold uppercase tracking-wider text-[#EE651D]">Engenharia de Software Moderna · Cap. 5</span>
          <h1 class="text-2xl font-extrabold mt-1">Princípios de Projeto & Métricas AST ao Vivo</h1>
          <p class="text-xs text-neutral-400 mt-1">Comparativo real calculado via módulo Python <code>ast</code> em <code>domain/code_metrics.py</code>.</p>
        </div>
        <button onclick="switchViewMode('split');" class="px-4 py-2 rounded-xl bg-[#EE651D] text-white text-xs font-extrabold">
          ← Voltar ao Protótipo
        </button>
      </div>

      <!-- Metrics Table -->
      <div class="p-6 rounded-[32px] bg-white shadow-card overflow-x-auto">
        <h2 class="text-base font-extrabold text-[#1C1C1E] mb-3">Métricas da Seção 5.7 (LOC, LCOM, CBO e Complexidade Ciclomática)</h2>
        <table class="w-full text-left text-xs border-collapse">
          <thead>
            <tr class="border-b border-neutral-200 text-neutral-400 uppercase">
              <th class="py-2.5">Classe Analisada</th>
              <th class="py-2.5">Versão</th>
              <th class="py-2.5">LOC</th>
              <th class="py-2.5">LCOM (Falta de Coesão)</th>
              <th class="py-2.5">CBO (Acoplamento)</th>
              <th class="py-2.5">Complexidade Ciclomática Máx.</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-100 font-mono">
            <tr class="bg-rose-50/70 text-rose-900 font-bold">
              <td class="py-3">${before.class_name}</td>
              <td>Entrega 1 (Go-Horse)</td>
              <td>${before.loc}</td>
              <td><span class="px-2 py-0.5 rounded bg-rose-600 text-white">${before.lcom} (Baixa Coesão)</span></td>
              <td>${before.cbo} (sqlite3 direto)</td>
              <td>${before.max_cyclomatic_complexity}</td>
            </tr>
            ${afterList.map(m => `
              <tr>
                <td class="py-3 font-bold text-[#1C1C1E]">${m.class_name}</td>
                <td class="text-[#2E7D32] font-sans font-bold">PoC Final V2</td>
                <td>${m.loc}</td>
                <td><span class="px-2 py-0.5 rounded bg-[#E8F5E9] text-[#2E7D32] font-bold">${m.lcom} (Alta Coesão)</span></td>
                <td>${m.cbo} (Abstrações DIP)</td>
                <td>${m.max_cyclomatic_complexity}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Principles Cards & AI Mistake Story -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${ch5.principles_applied.map(p => `
          <div class="p-5 rounded-3xl bg-white shadow-card">
            <span class="text-[11px] font-mono text-[#EE651D] font-bold">${p.where}</span>
            <h3 class="text-sm font-extrabold text-[#1C1C1E] mt-1">${p.title}</h3>
            <p class="text-xs text-neutral-600 mt-1.5 leading-relaxed">${p.explanation}</p>
          </div>
        `).join('')}
      </div>

      <div class="p-6 rounded-3xl bg-[#FFF8F3] border-2 border-[#EE651D] space-y-2">
        <h3 class="text-sm font-extrabold text-[#EE651D]">🤖 ${ch5.ai_mistake_story.title}</h3>
        <p class="text-xs text-[#1C1C1E]"><strong>Problema (Go-Horse):</strong> ${ch5.ai_mistake_story.problem}</p>
        <p class="text-xs text-[#2E7D32]"><strong>Correção (Cap. 5):</strong> ${ch5.ai_mistake_story.correction}</p>
      </div>
    </div>
  `;
}

// ============================================================================
// --- MAIN RENDER DISPATCHER ---
// ============================================================================

function render() {
  const root = document.getElementById('app-root');
  if (!root || !state.data) return;

  if (state._mountedViewMode !== state.viewMode || !document.getElementById('top-bar-mount')) {
    state._mountedViewMode = state.viewMode;
    state._lastTopBarHtml = null;
    state._lastStudentHtml = null;
    state._lastStaffHtml = null;
    state._lastTvHtml = null;
    state._lastCh5Html = null;

    root.innerHTML = `
      <div id="top-bar-mount"></div>
      <main class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        ${state.viewMode === 'tv' ? `
          <div id="tv-app-mount"></div>
        ` : state.viewMode === 'chapter5' ? `
          <div id="ch5-app-mount"></div>
        ` : state.viewMode === 'staff-mobile' ? `
          <div id="staff-app-mount"></div>
        ` : state.viewMode === 'split' ? `
          <div class="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            <div id="student-app-mount" class="xl:col-span-5 max-w-md mx-auto w-full min-w-0"></div>
            <div id="staff-app-mount" class="xl:col-span-7 min-w-0"></div>
          </div>
        ` : state.viewMode === 'student' ? `
          <div id="student-app-mount" class="max-w-md mx-auto"></div>
        ` : `
          <div id="staff-app-mount"></div>
        `}
      </main>
    `;
  }

  const topBarMount = document.getElementById('top-bar-mount');
  if (topBarMount) {
    const nextTopBarHtml = renderTopBar();
    if (state._lastTopBarHtml !== nextTopBarHtml) {
      state._lastTopBarHtml = nextTopBarHtml;
      topBarMount.innerHTML = nextTopBarHtml;
    }
  }

  renderStudentOnly();
  renderStaffOnly();

  const tvMount = document.getElementById('tv-app-mount');
  if (tvMount) {
    const nextTvHtml = renderTvMode();
    if (state._lastTvHtml !== nextTvHtml) {
      state._lastTvHtml = nextTvHtml;
      tvMount.innerHTML = nextTvHtml;
    }
  }

  const ch5Mount = document.getElementById('ch5-app-mount');
  if (ch5Mount) {
    const nextCh5Html = renderChapter5View();
    if (state._lastCh5Html !== nextCh5Html) {
      state._lastCh5Html = nextCh5Html;
      ch5Mount.innerHTML = nextCh5Html;
    }
  }
}

function renderStudentOnly() {
  const studentMount = document.getElementById('student-app-mount');
  if (!studentMount || !state.data) return;
  const nextStudentHtml = renderStudentSection();
  if (state._lastStudentHtml !== nextStudentHtml) {
    state._lastStudentHtml = nextStudentHtml;
    studentMount.innerHTML = nextStudentHtml;
  }
}

function renderStaffOnly() {
  const staffMount = document.getElementById('staff-app-mount');
  if (!staffMount || !state.data) return;
  const nextStaffHtml = state.viewMode === 'staff-mobile' ? renderStaffMobileView() : renderStaffSection();
  if (state._lastStaffHtml !== nextStaffHtml) {
    state._lastStaffHtml = nextStaffHtml;
    staffMount.innerHTML = nextStaffHtml;
  }
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && state.selectedProductModal) {
    closeProductModal();
  }
});

window.addEventListener('DOMContentLoaded', async () => {
  await fetchServerState();
  render();
  startPoller();
});
