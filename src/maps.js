// Loads the Google Maps JavaScript API once (same approach as the Business form in Frappe).
// Needs a BROWSER key in VITE_GOOGLE_MAPS_KEY, restricted by HTTP referrer to this site.
const KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY
let loading = null

export const mapsAvailable = () => Boolean(KEY)

export function loadMaps() {
  if (!KEY) return Promise.reject(new Error('No Google Maps key'))
  if (window.google && window.google.maps && window.google.maps.importLibrary) return Promise.resolve(window.google)
  if (!loading) {
    loading = new Promise((resolve, reject) => {
      window.__onGoogleMapsLoaded = () => resolve(window.google)
      window.gm_authFailure = () => reject(new Error('Google rejected the Maps key'))
      const s = document.createElement('script')
      s.src = 'https://maps.googleapis.com/maps/api/js?key=' + encodeURIComponent(KEY) + '&loading=async&v=weekly&callback=__onGoogleMapsLoaded'
      s.async = true
      s.onerror = () => reject(new Error('Could not load Google Maps'))
      document.head.appendChild(s)
    })
  }
  return loading
}