const defaultConfig = {
  hero_title: "To Our Amazing Teacher",
  hero_subtitle: "You Make Learning Magical ✨",
  quote_text: "A teacher takes a hand, opens a mind, and touches a heart",
  gratitude_title: "What We Appreciate",
  reason_1: "Your patience and understanding",
  reason_2: "Your creative teaching methods",
  reason_3: "Your dedication to our success",
  final_message: "Thank you for everything you do!",
  signature: "With love and gratitude 💐",
  hero_bg_color: "#ff6b9d",
  quote_bg_color: "#ffffff",
  gratitude_bg_color: "#a8e6cf",
  final_bg_color: "#ffd93d",
  text_color: "#333333",
  font_family: "Trebuchet MS, Lucida Sans Unicode, sans-serif",
  font_size: 16
};

async function onConfigChange(config) {
  const heroTitle = document.getElementById('heroTitle');
  const heroSubtitle = document.getElementById('heroSubtitle');
  const quoteText = document.getElementById('quoteText');
  const gratitudeTitle = document.getElementById('gratitudeTitle');
  const reason1 = document.getElementById('reason1');
  const reason2 = document.getElementById('reason2');
  const reason3 = document.getElementById('reason3');
  const finalMessage = document.getElementById('finalMessage');
  const signatureText = document.getElementById('signatureText');

  const customFont = config.font_family || defaultConfig.font_family;
  const baseFontSize = config.font_size || defaultConfig.font_size;

  document.body.style.fontFamily = `${customFont}, sans-serif`;

  heroTitle.textContent = config.hero_title;
  heroSubtitle.textContent = config.hero_subtitle;
  quoteText.textContent = config.quote_text;
  gratitudeTitle.textContent = config.gratitude_title;
  reason1.textContent = config.reason_1;
  reason2.textContent = config.reason_2;
  reason3.textContent = config.reason_3;
  finalMessage.textContent = config.final_message;
  signatureText.textContent = config.signature;

  heroTitle.style.fontSize = `${baseFontSize * 3.5}px`;
  heroSubtitle.style.fontSize = `${baseFontSize * 1.625}px`;
  quoteText.style.fontSize = `${baseFontSize * 1.75}px`;
  gratitudeTitle.style.fontSize = `${baseFontSize * 2.5}px`;
  reason1.style.fontSize = `${baseFontSize * 1.375}px`;
  reason2.style.fontSize = `${baseFontSize * 1.375}px`;
  reason3.style.fontSize = `${baseFontSize * 1.375}px`;
  finalMessage.style.fontSize = `${baseFontSize * 2.25}px`;
  signatureText.style.fontSize = `${baseFontSize * 1.5}px`;
}

/* CONFETTI */
function createConfetti() {
  const colors = ['#ff6b9d', '#ffd93d', '#a8e6cf', '#c06c84', '#ffb347'];
  const confettiCount = 50;

  for (let i = 0; i < confettiCount; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.width = (Math.random() * 10 + 5) + 'px';
      confetti.style.height = (Math.random() * 10 + 5) + 'px';
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      document.body.appendChild(confetti);

      setTimeout(() => confetti.remove(), 3000);
    }, i * 30);
  }
}

/* Button event */
document.getElementById('celebrateBtn').addEventListener('click', function () {
  createConfetti();
  this.textContent = '🎊 Celebrating! 🎊';

  setTimeout(() => {
    this.textContent = "Celebrate Teacher's Day! 🎉";
  }, 2000);
});

/* SDK CONFIG */
if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange,
    mapToCapabilities: (config) => ({
      recolorables: [
        {
          get: () => config.hero_bg_color,
          set: (value) => {
            config.hero_bg_color = value;
            window.elementSdk.setConfig({ hero_bg_color: value });
          }
        }
      ],
      fontEditable: {
        get: () => config.font_family,
        set: (value) => {
          config.font_family = value;
          window.elementSdk.setConfig({ font_family: value });
        }
      },
      fontSizeable: {
        get: () => config.font_size,
        set: (value) => {
          config.font_size = value;
          window.elementSdk.setConfig({ font_size: value });
        }
      }
    }),
    mapToEditPanelValues: (config) => new Map([
      ["hero_title", config.hero_title],
      ["hero_subtitle", config.hero_subtitle],
      ["quote_text", config.quote_text],
      ["gratitude_title", config.gratitude_title],
      ["reason_1", config.reason_1],
      ["reason_2", config.reason_2],
      ["reason_3", config.reason_3],
      ["final_message", config.final_message],
      ["signature", config.signature]
    ])
  });

  onConfigChange(window.elementSdk.config);
} else {
  onConfigChange(defaultConfig);
}
