'use client';

// src/app/proximo/join/page.tsx
// ============================================================================
// Próximo — Page d'invitation web
// URL : https://rize-website-steel.vercel.app/proximo/join?code=PRXABC1234
// ----------------------------------------------------------------------------
// Flow :
//   1. Tente d'ouvrir vigiapp://proximo/accept?code=XXX
//   2. Si VigiApp installé → ouvre directement la page d'acceptation
//   3. Si non installé → boutons Play Store + recherche
// ============================================================================

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.guigui92.vigiapp';
const PLAY_STORE_SEARCH = 'https://play.google.com/store/search?q=VigiApp&c=apps';

function ProximoJoinContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code') || '';
  const [attempted, setAttempted] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const deepLink = `vigiapp://proximo/accept?code=${code}`;

  // Tentative automatique d'ouverture du deep link au chargement
  useEffect(() => {
    if (!code) return;

    const timer = setTimeout(() => {
      window.location.href = deepLink;
      setAttempted(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [code, deepLink]);

  // Compte à rebours visuel
  useEffect(() => {
    if (!code) return;
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [code]);

  if (!code) {
    return (
      <div style={styles.errorWrap}>
        <div style={styles.errorIcon}>❌</div>
        <h2 style={styles.errorTitle}>Código inválido</h2>
        <p style={styles.errorSub}>Este link não contém um código válido.</p>
        <a href={PLAY_STORE_URL} style={styles.playBtn}>
          Baixar VigiApp
        </a>
      </div>
    );
  }

  return (
    <div style={styles.wrap}>

      {/* Logo */}
      <div style={styles.logoWrap}>
        <div style={styles.logoHeart}>❤️</div>
        <span style={styles.logoText}>Próximo</span>
      </div>

      {/* Hero */}
      <div style={styles.heroWrap}>
        <h1 style={styles.heroTitle}>
          Você foi convidado para uma rede de cuidado
        </h1>
        <p style={styles.heroSub}>
          Alguém de confiança quer te acompanhar pelo VigiApp.
          Sem rastreamento — só um aviso se você não der sinal de vida. 💙
        </p>
      </div>

      {/* Código */}
      <div style={styles.codeBlock}>
        <span style={styles.codeLabel}>Seu código</span>
        <span style={styles.codeText}>{code}</span>
        <span style={styles.codeExpiry}>⏰ Expira em 48 horas</span>
      </div>

      {/* CTA principal — deep link */}
      {countdown > 0 ? (
        <div style={styles.autoOpenWrap}>
          <div style={styles.spinner} />
          <p style={styles.autoOpenText}>
            Abrindo o VigiApp em <strong>{countdown}s</strong>…
          </p>
        </div>
      ) : (
        <a href={deepLink} style={styles.primaryBtn}>
          ❤️ Abrir no VigiApp
        </a>
      )}

      {/* Divider */}
      <div style={styles.dividerWrap}>
        <div style={styles.dividerLine} />
        <span style={styles.dividerText}>Não tem o VigiApp?</span>
        <div style={styles.dividerLine} />
      </div>

      {/* Botões secundários */}
      <div style={styles.secondaryBtns}>
        <a href={PLAY_STORE_URL} style={styles.playBtn}>
          ▶ Baixar VigiApp grátis na Play Store
        </a>
        <a href={PLAY_STORE_SEARCH} style={styles.searchBtn}>
          🔍 Procurar &quot;VigiApp&quot; na Play Store
        </a>
      </div>

      {/* Instruções */}
      <div style={styles.instructionsWrap}>
        <h3 style={styles.instructionsTitle}>Como aceitar o convite</h3>
        <div style={styles.step}>
          <span style={styles.stepNum}>1</span>
          <span style={styles.stepText}>Baixe e abra o VigiApp</span>
        </div>
        <div style={styles.step}>
          <span style={styles.stepNum}>2</span>
          <span style={styles.stepText}>Toque em ❤️ <strong>Próximo</strong> na barra inferior</span>
        </div>
        <div style={styles.step}>
          <span style={styles.stepNum}>3</span>
          <span style={styles.stepText}>Toque em <strong>&quot;Entrar código recebido&quot;</strong></span>
        </div>
        <div style={styles.step}>
          <span style={styles.stepNum}>4</span>
          <span style={styles.stepText}>Digite o código: <strong style={{ color: '#E11D48' }}>{code}</strong></span>
        </div>
        <div style={styles.step}>
          <span style={styles.stepNum}>5</span>
          <span style={styles.stepText}>Toque em <strong>&quot;Aceitar convite&quot;</strong> ✅</span>
        </div>
      </div>

      {/* Privacy */}
      <div style={styles.privacyWrap}>
        <span style={styles.privacyIcon}>🔒</span>
        <p style={styles.privacyText}>
          Sem rastreamento de localização. O VigiApp só envia alertas de inatividade — nada mais.
        </p>
      </div>

      {/* Footer */}
      <p style={styles.footer}>
        VigiApp · Segurança de vizinhança · Brasil 🇧🇷
      </p>

    </div>
  );
}

export default function ProximoJoinPage() {
  return (
    <Suspense fallback={
      <div style={{ background: '#181A20', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#9CA3AF', fontSize: 16 }}>Carregando…</p>
      </div>
    }>
      <ProximoJoinContent />
    </Suspense>
  );
}

// ============================================================================
// Styles inline — mobile first, dark, Brazil
// ============================================================================
const styles: Record<string, React.CSSProperties> = {
  wrap: {
    background: '#181A20',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '32px 20px 60px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    maxWidth: 480,
    margin: '0 auto',
    gap: 24,
  },

  logoWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  logoHeart: { fontSize: 24 },
  logoText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 800,
    letterSpacing: -0.3,
  },

  heroWrap: {
    textAlign: 'center',
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 800,
    lineHeight: 1.3,
    margin: '0 0 12px',
    letterSpacing: -0.5,
  },
  heroSub: {
    color: '#9CA3AF',
    fontSize: 15,
    lineHeight: 1.6,
    margin: 0,
  },

  codeBlock: {
    background: '#20242C',
    border: '2px solid rgba(225,29,72,0.3)',
    borderRadius: 18,
    padding: '20px 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
    width: '100%',
    boxSizing: 'border-box',
  },
  codeLabel: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  codeText: {
    color: '#E11D48',
    fontSize: 32,
    fontWeight: 900,
    letterSpacing: 4,
    fontVariantNumeric: 'tabular-nums',
  },
  codeExpiry: {
    color: '#9CA3AF',
    fontSize: 13,
  },

  autoOpenWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    width: '100%',
  },
  spinner: {
    width: 32,
    height: 32,
    border: '3px solid rgba(225,29,72,0.2)',
    borderTop: '3px solid #E11D48',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  autoOpenText: {
    color: '#C7CDD9',
    fontSize: 15,
    margin: 0,
    textAlign: 'center',
  },

  primaryBtn: {
    display: 'block',
    width: '100%',
    boxSizing: 'border-box',
    background: '#E11D48',
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 800,
    padding: '17px 24px',
    borderRadius: 18,
    textDecoration: 'none',
    textAlign: 'center',
  },

  dividerWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    width: '100%',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    background: 'rgba(255,255,255,0.06)',
  },
  dividerText: {
    color: '#9CA3AF',
    fontSize: 13,
    fontWeight: 600,
    whiteSpace: 'nowrap',
  },

  secondaryBtns: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    width: '100%',
  },
  playBtn: {
    display: 'block',
    width: '100%',
    boxSizing: 'border-box',
    background: '#10B981',
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 700,
    padding: '15px 20px',
    borderRadius: 16,
    textDecoration: 'none',
    textAlign: 'center',
  },
  searchBtn: {
    display: 'block',
    width: '100%',
    boxSizing: 'border-box',
    background: '#20242C',
    color: '#C7CDD9',
    fontSize: 15,
    fontWeight: 600,
    padding: '15px 20px',
    borderRadius: 16,
    textDecoration: 'none',
    textAlign: 'center',
    border: '1px solid rgba(255,255,255,0.08)',
  },

  instructionsWrap: {
    background: '#20242C',
    borderRadius: 16,
    padding: '18px 16px',
    width: '100%',
    boxSizing: 'border-box',
    border: '1px solid rgba(255,255,255,0.06)',
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
  },
  instructionsTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 700,
    margin: '0 0 4px',
  },
  step: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
  },
  stepNum: {
    background: '#E11D48',
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 800,
    width: 24,
    height: 24,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  stepText: {
    color: '#C7CDD9',
    fontSize: 14,
    lineHeight: 1.5,
    paddingTop: 3,
  },

  privacyWrap: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 10,
    background: 'rgba(16,185,129,0.08)',
    border: '1px solid rgba(16,185,129,0.2)',
    borderRadius: 12,
    padding: '12px 14px',
    width: '100%',
    boxSizing: 'border-box',
  },
  privacyIcon: { fontSize: 16, flexShrink: 0 },
  privacyText: {
    color: '#9CA3AF',
    fontSize: 13,
    lineHeight: 1.5,
    margin: 0,
  },

  footer: {
    color: 'rgba(156,163,175,0.5)',
    fontSize: 12,
    textAlign: 'center',
    margin: 0,
  },

  errorWrap: {
    background: '#181A20',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px 20px',
    gap: 16,
    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
  },
  errorIcon: { fontSize: 48 },
  errorTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: 800, margin: 0 },
  errorSub: { color: '#9CA3AF', fontSize: 15, margin: 0, textAlign: 'center' },
};