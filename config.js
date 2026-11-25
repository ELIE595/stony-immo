// =====================================================================
//  STONY IMMO — configuration de la connexion à Supabase
//  Remplacez les deux valeurs ci-dessous par celles de votre projet :
//  Supabase → Project Settings → API (ou « API Keys »)
//  Ces clés sont publiques par nature : la sécurité est assurée par les
//  règles de la base (schema.sql). Ne mettez JAMAIS ici la clé « service_role ».
//  Tant que ces valeurs ne sont pas remplies, le site tourne en mode démonstration.
// =====================================================================
window.STONY_CONFIG = {
  supabaseUrl: 'https://VOTRE-PROJET.supabase.co',
  supabaseAnonKey: 'VOTRE_CLE_ANON_PUBLIQUE',
};
