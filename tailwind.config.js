module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0d1117',
        panel: '#0f1623',
        card: '#131b2a',
        primary: '#4cc9f0',
        accent: '#80ffdb',
        danger: '#ff6b6b',
        ok: '#29f19c',
        text: '#e6edf3',
        muted: '#9fb1c6',
        border: 'rgba(255, 255, 255, 0.08)'
      },
      boxShadow: {
        glass: '0 10px 30px rgba(0,0,0,.35), inset 0 0 0 1px rgba(255, 255, 255, 0.08)',
      },
      borderRadius: {
        smooth: '16px',
        smoothSm: '12px'
      },
      fontSize: {
        'heading': ['clamp(32px, 4vw, 42px)', '1.15']
      },
      transitionProperty: {
        'width': 'width',
      },
    },
  },
  plugins: [],
}
