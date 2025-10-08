import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.58.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PriceAlert {
  id: string;
  user_id: string;
  coin_symbol: string;
  coin_name: string;
  alert_type: string;
  target_value: number;
  is_active: boolean;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Checking price alerts...');

    // Fetch all active alerts
    const { data: alerts, error: alertsError } = await supabase
      .from('price_alerts')
      .select('*')
      .eq('is_active', true)
      .is('triggered_at', null);

    if (alertsError) throw alertsError;

    if (!alerts || alerts.length === 0) {
      console.log('No active alerts to check');
      return new Response(
        JSON.stringify({ message: 'No active alerts', checked: 0 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Found ${alerts.length} active alerts to check`);

    // Get unique coin IDs
    const uniqueCoins = [...new Set(alerts.map((a: PriceAlert) => a.coin_symbol.toLowerCase()))];
    
    // Fetch current prices from CoinGecko
    const pricesResponse = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${uniqueCoins.join(',')}&vs_currencies=usd`
    );
    
    if (!pricesResponse.ok) {
      throw new Error('Failed to fetch crypto prices');
    }

    const prices = await pricesResponse.json();
    console.log('Fetched current prices:', prices);

    let triggeredCount = 0;

    // Check each alert
    for (const alert of alerts) {
      const coinId = alert.coin_symbol.toLowerCase();
      const currentPrice = prices[coinId]?.usd;

      if (!currentPrice) {
        console.log(`No price found for ${coinId}`);
        continue;
      }

      let shouldTrigger = false;

      if (alert.alert_type === 'price_above' && currentPrice >= alert.target_value) {
        shouldTrigger = true;
      } else if (alert.alert_type === 'price_below' && currentPrice <= alert.target_value) {
        shouldTrigger = true;
      }

      if (shouldTrigger) {
        console.log(`Alert triggered for ${alert.coin_name}: ${alert.alert_type} ${alert.target_value}`);
        
        // Update alert as triggered
        const { error: updateError } = await supabase
          .from('price_alerts')
          .update({ 
            triggered_at: new Date().toISOString(),
            is_active: false 
          })
          .eq('id', alert.id);

        if (updateError) {
          console.error('Error updating alert:', updateError);
        } else {
          triggeredCount++;
        }

        // Here you could also send notifications via email/push
        // For now, just logging
        console.log(`Notification would be sent for alert ${alert.id}`);
      }
    }

    console.log(`Check complete. Triggered ${triggeredCount} alerts`);

    return new Response(
      JSON.stringify({ 
        message: 'Price alerts checked successfully',
        checked: alerts.length,
        triggered: triggeredCount
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error in check-price-alerts:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
