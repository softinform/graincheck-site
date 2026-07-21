/*
 * GrainCheck — universal web→app install attribution (Tenjin custom "web" channel).
 *
 * Every "Install" / store button is routed THROUGH a Tenjin click tracking link,
 * which records the click (with the inbound source) and redirects to the store.
 * Works for ANY channel — Meta, Google, TikTok, email, Telegram, referral, organic
 * — the source is read from UTM tags / click-ids and passed to Tenjin.
 *
 * Links come from Tenjin → CONFIGURE → Campaigns (custom channel "web"), per platform.
 * Meta needs no link here (it's a self-attributing network: S2S callbacks + site pixel).
 */
(function (w, d) {
  // ===== Tenjin custom "web" channel click links (per platform) + store fallbacks =====
  var WEB_LINK = {
    ios:     'https://track.tenjin.com/v0/click/dtcsfr8fPIbvngpSTvAzZ',
    android: 'https://track.tenjin.com/v0/click/fOrJP5JZPJ1iow8xWRkc8j'
  };
  var STORE_URL = {
    ios:     'https://apps.apple.com/app/graincheck/id6761753467',
    android: 'https://play.google.com/store/apps/details?id=com.graincheck.app'
  };
  var META_PIXEL_ID = '1115565107707861';
  // ====================================================================================

  var q = new URLSearchParams(w.location.search);
  var get = function (k) { return q.get(k) || ''; };
  var SRC = {
    utm_source: get('utm_source'), utm_medium: get('utm_medium'),
    utm_campaign: get('utm_campaign'), utm_content: get('utm_content'), utm_term: get('utm_term'),
    fbclid: get('fbclid'), gclid: get('gclid'), ttclid: get('ttclid')
  };
  function cookie(n) { var m = d.cookie.match('(^|;)\\s*' + n + '\\s*=\\s*([^;]+)'); return m ? m.pop() : ''; }

  // Readable source label so Tenjin groups installs by where they came from.
  function sourceLabel() {
    var s = SRC.utm_source ||
            (SRC.fbclid ? 'meta' : SRC.gclid ? 'google' : SRC.ttclid ? 'tiktok' : 'organic');
    return SRC.utm_campaign ? s + '_' + SRC.utm_campaign : s;
  }

  // Full Tenjin click URL for a platform → records click, then redirects to the store.
  function GC_tenjinClickURL(platform) {
    var base = WEB_LINK[platform];
    if (!base) return STORE_URL[platform] || null; // no tenjin link → go straight to store
    var sep = base.indexOf('?') === -1 ? '?' : '&';
    return base + sep + [
      'campaign_name='      + encodeURIComponent(sourceLabel()),
      'creative_name='      + encodeURIComponent(SRC.utm_content || SRC.utm_medium),
      'tenjin_parameter_0=' + encodeURIComponent(SRC.fbclid || cookie('_fbc')),
      'tenjin_parameter_1=' + encodeURIComponent(cookie('_fbp')),
      'tenjin_parameter_2=' + encodeURIComponent(SRC.utm_source),
      'tenjin_parameter_3=' + encodeURIComponent(SRC.gclid || SRC.ttclid),
      'redirect_url='       + encodeURIComponent(STORE_URL[platform])
    ].join('&');
  }
  w.GC_tenjinClickURL = GC_tenjinClickURL; // install.html builds its redirect from this

  // Side pings for Meta optimisation + GA (Tenjin attribution is the redirect itself).
  function GC_fireInstallTracking() {
    if (META_PIXEL_ID && w.fbq) { try { w.fbq('trackCustom', 'InstallClick', { source: SRC.utm_source || 'web' }); } catch (e) {} }
    if (w.gtag) { try { w.gtag('event', 'install_click', { source: SRC.utm_source || 'direct', campaign: SRC.utm_campaign }); } catch (e) {} }
  }
  w.GC_fireInstallTracking = GC_fireInstallTracking;

  function platformOf(href) {
    return /apps\.apple\.com/.test(href) ? 'ios' : /play\.google\.com/.test(href) ? 'android' : null;
  }

  // Point every store button at its Tenjin click link (which redirects to the store).
  function wire() {
    var links = d.querySelectorAll('a[href*="play.google.com/store/apps"], a[href*="apps.apple.com"]');
    Array.prototype.forEach.call(links, function (a) {
      var plat = platformOf(a.href);
      if (!plat) return;
      a.href = GC_tenjinClickURL(plat);
      a.addEventListener('click', GC_fireInstallTracking, { passive: true });
    });
  }

  if (w.GC_NO_AUTOWIRE) return;
  if (d.readyState !== 'loading') wire();
  else d.addEventListener('DOMContentLoaded', wire);
})(window, document);
