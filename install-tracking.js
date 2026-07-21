/*
 * GrainCheck — universal web→app install attribution.
 *
 * Fires a Tenjin tracking link (silent, non-blocking) whenever a user taps an
 * "Install" / store button, forwarding whatever source drove them here.
 * Works for ANY channel — Meta, Google, TikTok, email, Telegram, referral —
 * as long as the inbound link carries UTM tags (utm_source / utm_medium / ...).
 *
 * SETUP — fill the two constants below:
 *   TENJIN_TRACKING_LINK : Tenjin dashboard → Campaigns → create campaign → copy
 *                          the tracking link (the whole URL). Leave '' = disabled.
 *   META_PIXEL_ID        : optional. Only needed if you run Meta ads and want the
 *                          Meta pixel to also register the conversion. Leave '' = off.
 *
 * Nothing else on the page needs changing — it auto-wires every App Store /
 * Google Play link. (A page can set window.GC_NO_AUTOWIRE = true before loading
 * this file and instead call GC_fireInstallTracking() itself — used by install.html.)
 */
(function (w, d) {
  // ============ CONFIG — paste your IDs here ============
  var TENJIN_TRACKING_LINK = ''; // e.g. 'https://track.tenjin.com/v0/xxxxxxxxxxxxxxxxxxxxxx'
  var META_PIXEL_ID        = '1115565107707861';
  // =====================================================

  var q = new URLSearchParams(w.location.search);
  var get = function (k) { return q.get(k) || ''; };

  // The source that drove this visit — captured once, from the inbound URL.
  var SRC = {
    utm_source:   get('utm_source'),
    utm_medium:   get('utm_medium'),
    utm_campaign: get('utm_campaign'),
    utm_content:  get('utm_content'),
    utm_term:     get('utm_term'),
    fbclid:       get('fbclid'),   // Meta click id
    gclid:        get('gclid'),    // Google click id
    ttclid:       get('ttclid')    // TikTok click id
  };

  function cookie(name) {
    var m = d.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return m ? m.pop() : '';
  }

  // Build the Tenjin tracking URL with the source params appended.
  // Param mapping may need tweaking to match how the link is set up in Tenjin.
  function tenjinURL() {
    if (!TENJIN_TRACKING_LINK) return '';
    var sep = TENJIN_TRACKING_LINK.indexOf('?') === -1 ? '?' : '&';
    return TENJIN_TRACKING_LINK + sep + [
      'campaign_name='      + encodeURIComponent(SRC.utm_campaign || SRC.utm_source || 'website'),
      'creative_name='      + encodeURIComponent(SRC.utm_content),
      'tenjin_parameter_0=' + encodeURIComponent(SRC.fbclid || cookie('_fbc')),
      'tenjin_parameter_1=' + encodeURIComponent(cookie('_fbp')),
      'tenjin_parameter_2=' + encodeURIComponent(SRC.utm_source),
      'tenjin_parameter_3=' + encodeURIComponent(SRC.utm_medium),
      'tenjin_parameter_4=' + encodeURIComponent(SRC.gclid || SRC.ttclid)
    ].join('&');
  }

  // Compact source string for the Google Play install referrer (Android = deterministic).
  function playReferrer() {
    var p = [];
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
     'fbclid', 'gclid', 'ttclid'].forEach(function (k) {
      if (SRC[k]) p.push(k + '=' + SRC[k]);
    });
    return p.join('&');
  }

  // Fire the tracking pings — silent, never blocks navigation.
  function fire() {
    var url = tenjinURL();
    if (url) {
      try {
        if (w.navigator && navigator.sendBeacon) navigator.sendBeacon(url);
        else fetch(url, { method: 'GET', mode: 'no-cors', keepalive: true });
      } catch (e) { /* non-critical */ }
    }
    if (META_PIXEL_ID && w.fbq) {
      try { w.fbq('trackCustom', 'InstallClick', { source: SRC.utm_source || 'website' }); } catch (e) {}
    }
    if (w.gtag) {
      try { w.gtag('event', 'install_click', { source: SRC.utm_source || 'direct', campaign: SRC.utm_campaign }); } catch (e) {}
    }
  }
  w.GC_fireInstallTracking = fire; // callable by pages that manage their own redirect

  // Wire every store link: carry the source into the Play referrer + fire on click.
  function wire() {
    var ref = playReferrer();
    var links = d.querySelectorAll(
      'a[href*="play.google.com/store/apps"], a[href*="apps.apple.com"]'
    );
    Array.prototype.forEach.call(links, function (a) {
      if (/play\.google\.com/.test(a.href) && ref && a.href.indexOf('referrer=') === -1) {
        a.href += (a.href.indexOf('?') === -1 ? '?' : '&') + 'referrer=' + encodeURIComponent(ref);
      }
      a.addEventListener('click', fire, { passive: true });
    });
  }

  if (w.GC_NO_AUTOWIRE) return;
  if (d.readyState !== 'loading') wire();
  else d.addEventListener('DOMContentLoaded', wire);
})(window, document);
