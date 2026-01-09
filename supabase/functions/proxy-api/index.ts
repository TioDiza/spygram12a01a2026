import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const API_BASE_URL = 'https://spypanel.shop';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const API_SECRET_KEY = Deno.env.get('API_SECRET_KEY')
    if (!API_SECRET_KEY) {
      throw new Error('API_SECRET_KEY is not set in Supabase secrets.')
    }

    // Lê o corpo JSON da requisição POST
    const { campo, username } = await req.json()

    if (!campo || !username) {
      return new Response(
        JSON.stringify({ error: 'Missing "campo" or "username" in request body.' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    const targetUrl = `${API_BASE_URL}/api/field?campo=${encodeURIComponent(campo)}&username=${encodeURIComponent(username)}&secret=${API_SECRET_KEY}`

    const response = await fetch(targetUrl, {
      headers: { 'Accept': 'application/json' }
    })

    if (!response.ok) {
        const errorBody = await response.text();
        console.error(`External API error: ${response.status} ${response.statusText}`, errorBody);
        throw new Error(`External API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Error in proxy function:', error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})