/**
* Connexion Supabase
* La clé "publishable" (sb_publishable_...) est publique par conception :
* la sécurité des données repose sur les règles RLS des tables.
* Ne jamais mettre ici la clé "secret" (sb_secret_...) ni la clé service_role.
*/

(function() {
  "use strict";

  const SUPABASE_URL = 'https://gjiqxswjczvbgkepicjw.supabase.co';
  const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_Y3ljB9Ki8mZmLDmwQ0Dg6g_X-29-QeJ';

  if (typeof supabase === 'undefined') {
    console.error('Supabase : la librairie supabase-js n\'est pas chargée.');
    return;
  }

  window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

})();
