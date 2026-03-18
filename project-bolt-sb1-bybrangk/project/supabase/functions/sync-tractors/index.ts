import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface TractorData {
  model: string;
  fullModelName: string;
  hp: number;
  rearTyreSize: string;
  type: string;
  drive: string;
  imageUrl: string;
  description: string;
  series: string;
  engine: string;
  transmission: string;
  pto: string;
  hydraulics: string;
  fuelTank: string;
  weight: string;
  johnDeereUrl: string;
}

async function extractTractorData(url: string): Promise<any> {
  try {
    const response = await fetch(url);
    const html = await response.text();

    const imageMatch = html.match(/\/assets\/images\/tractors\/[^"']+\.(jpg|png|jpeg)/i);
    const hpMatch = html.match(/(\d+)\s*HP/i);

    return {
      imageUrl: imageMatch ? `https://www.deere.co.in${imageMatch[0]}` : null,
      hp: hpMatch ? parseInt(hpMatch[1]) : null,
      html: html
    };
  } catch (error) {
    console.error(`Error extracting data from ${url}:`, error);
    return null;
  }
}

async function syncTractors(supabaseClient: any) {
  const tractorModels = [
    {
      model: '5130M',
      fullModelName: '5130M PowerTech Plus',
      hp: 130,
      rearTyreSize: '540/65R38',
      type: 'PowerTech Plus',
      drive: '4WD',
      imageUrl: 'https://www.deere.co.in/assets/images/region-1/products/tractors/5130_5m_left_large_cc7f7be57b2fe750f112b1978ac3e493270af48e.jpg',
      description: 'India\'s most powerful tractor with 130 HP, featuring advanced Powr8 EcoShift transmission, premium cab with air suspension seat, and cutting-edge technology for maximum productivity in diverse agricultural applications.',
      series: '5M-Series',
      engine: '4-cylinder, 4.5L PowerTech Plus HPCR TREM-V diesel engine',
      transmission: 'Powr8 EcoShift 32F+16R with Creeper (16F+8R), Fully Synchronized',
      pto: 'Standard 540, 540E, 1000 RPM - 119.6 HP PTO Power',
      hydraulics: '3700 kg lifting capacity with Electronic Hitch Control, 3 Standard SCVs, 97 L/min flow',
      fuelTank: '165 liters',
      weight: '3964 kg (unladen)',
      johnDeereUrl: 'https://www.deere.co.in/en/tractors/5m-series-tractors/5130m-tractor/'
    },
    {
      model: '5075E',
      fullModelName: '5075E PowerTech',
      hp: 74,
      rearTyreSize: '16.9 x 28',
      type: 'PowerTech',
      drive: '4WD',
      imageUrl: 'https://www.deere.co.in/assets/images/tractors/e-series-tractors/5075e-tractor/5075E_Front_Right_Studio_Graphic_4k_large_0d6f490e3a6e1a799a32ba828c1f9bffe32e2cf6.jpg',
      description: 'Premium 74 HP tractor with turbocharged engine featuring charge air cooler. Ideal for intensive farming operations with superior power, comfort, and fuel efficiency. Available with optional AC cabin.',
      series: 'E-Series',
      engine: '3-cylinder, 2.9L Turbocharged diesel with charge air cooler',
      transmission: '12F+4R or 12F+12R PR Transmission with 9F+3R creeper speeds',
      pto: 'Standard/Dual PTO - 540 RPM at 2400 engine RPM, 46.2 kW (62 HP) PTO power',
      hydraulics: 'Dual clutch system with category II linkage',
      fuelTank: 'Standard fuel capacity',
      weight: 'Robust construction for heavy-duty applications',
      johnDeereUrl: 'https://www.deere.co.in/en/tractors/e-series-tractors/5075e-tractor/'
    },
    {
      model: '5405',
      fullModelName: '5405 PowerTech TREM IV',
      hp: 63,
      rearTyreSize: '14.9 x 28',
      type: 'PowerTech',
      drive: '4WD',
      imageUrl: 'https://www.deere.co.in/assets/images/tractors/e-series-tractors/5405-tractor/5405_ac_cab_right_low_large_2345c81c932e22a9a36425d7b6b85b9f2325c03c.jpg',
      description: 'Powerful 63 HP turbocharged tractor with advanced 3029H engine. Features Power Reverser technology and 500-hour service intervals. Perfect for heavy-duty farming with excellent traction and reliability.',
      series: 'E-Series',
      engine: '3-cylinder, 2.9L Turbocharged diesel with charge air cooler, 47 kW (63 HP)',
      transmission: '12F+4R Collar Shift or 12F+12R PR Transmission with 9F+3R creeper speeds',
      pto: 'Standard/Dual/Reverse PTO - 540 RPM at 2100 engine RPM, 40.3 kW (54 HP) PTO power',
      hydraulics: 'Dual clutch, high lifting capacity for implements',
      fuelTank: 'Extended capacity for long working hours',
      weight: 'Heavy-duty construction',
      johnDeereUrl: 'https://www.deere.co.in/en/tractors/e-series-tractors/5405-tractor/'
    },
    {
      model: '5310',
      fullModelName: '5310 PowerTech',
      hp: 57,
      rearTyreSize: '14.9 x 28',
      type: 'PowerTech',
      drive: '2WD',
      imageUrl: 'https://www.deere.co.in/assets/images/tractors/e-series-tractors/5310e-tractor/john_deere_india_trem4_5310_right_angle_large_1a5dd6f40ebd3c6aac80321ed0a29f52e44dbe57.png',
      description: 'Efficient 57 HP tractor with turbocharged engine. Perfect for rotavator work, general farm operations, and flat terrains. Excellent fuel economy with TSS transmission option for easy operation.',
      series: 'E-Series',
      engine: '3-cylinder, 2.9L Turbocharged diesel with charge air cooler, 41 kW (55 HP)',
      transmission: '12F+4R Collar Shift or TSS / 12F+12R PR with 9F+3R creeper speeds',
      pto: 'Standard/Dual/Reverse PTO - 540 RPM, 36.9 kW (49.5 HP) PTO power',
      hydraulics: 'Dual clutch system, reliable hydraulic performance',
      fuelTank: 'Optimized for long field operations',
      weight: 'Balanced design for stability',
      johnDeereUrl: 'https://www.deere.co.in/en/tractors/e-series-tractors/5310e-tractor/'
    },
    {
      model: '5210',
      fullModelName: '5210 GearPro',
      hp: 50,
      rearTyreSize: '13.6 x 28',
      type: 'GearPro',
      drive: '2WD',
      imageUrl: 'https://www.deere.co.in/assets/images/tractors/e-series-tractors/5210GearPro-tractor/John_Deere_India_Tractors_5210_Gear_Pro_large_0f8a86c79862106b322a2cbee2f41369222a70a4.jpg',
      description: 'Popular 50 HP turbocharged model with GearPro technology. Ideal for medium farms offering balanced performance for diverse farming applications. Features 12F+4R transmission for versatility.',
      series: 'E-Series',
      engine: '3-cylinder, 2.9L Turbocharged diesel, 37.3 kW (50 HP) at 2400 RPM',
      transmission: '12F+4R Collar Shift/TSS transmission',
      pto: 'Standard/Dual/Reverse PTO - 540 RPM, 31.8 kW (42.6 HP) PTO power',
      hydraulics: 'Dual clutch system with reliable performance',
      fuelTank: 'Adequate capacity for field work',
      weight: 'Efficient weight distribution',
      johnDeereUrl: 'https://www.deere.co.in/en/tractors/e-series-tractors/5210-gearpro-tractor/'
    },
    {
      model: '5050D',
      fullModelName: '5050D',
      hp: 50,
      rearTyreSize: '14.9 x 28',
      type: 'Standard',
      drive: '2WD',
      imageUrl: 'https://www.deere.co.in/assets/images/images/5050d_tractor_large_1d4d9d02bdedcff9452193a7843884aa9058dc44.png',
      description: 'Reliable 50 HP workhorse widely trusted by farmers. Features naturally aspirated engine with high backup torque, planetary gear with straight axle, and 4WD option. Perfect for agricultural and haulage applications.',
      series: 'D-Series',
      engine: '3-cylinder, 2.9L naturally aspirated diesel, 50 HP (36.5 kW) at 2100 RPM',
      transmission: '8F+4R Collarshift, fully constant mesh gearbox',
      pto: 'Standard: 540 @ 2100 RPM, Economy: 540 @ 1600 RPM',
      hydraulics: '1600 kgf maximum lifting capacity at lower link ends, Category II',
      fuelTank: 'Standard fuel capacity',
      weight: '1870 kg total weight',
      johnDeereUrl: 'https://www.deere.co.in/en/tractors/d-series-tractors/5050d-tractor/'
    },
    {
      model: '5050D',
      fullModelName: '5050D 4WD',
      hp: 50,
      rearTyreSize: '16.9 x 28',
      type: 'Standard',
      drive: '4WD',
      imageUrl: 'https://www.deere.co.in/assets/images/images/5050d_tractor_large_1d4d9d02bdedcff9452193a7843884aa9058dc44.png',
      description: 'Powerful 50 HP 4WD variant ideal for puddling and heavy-duty operations. Features HLD option, bigger tires for better traction, and adjustable front axle. Excellent for wet conditions and slippery fields.',
      series: 'D-Series',
      engine: '3-cylinder, 2.9L naturally aspirated diesel, 50 HP (36.5 kW) at 2100 RPM',
      transmission: '8F+4R Collarshift with optional reaper speeds',
      pto: 'Standard: 540 @ 2100 RPM, Economy: 540 @ 1600 RPM, Reverse PTO available',
      hydraulics: '1600 kgf lifting capacity, EQRL for quick implement control',
      fuelTank: 'Standard capacity',
      weight: 'Enhanced weight for 4WD configuration',
      johnDeereUrl: 'https://www.deere.co.in/en/tractors/d-series-tractors/5050d-tractor/'
    },
    {
      model: '5050D',
      fullModelName: '5050D GearPro',
      hp: 50,
      rearTyreSize: '14.9 x 28',
      type: 'GearPro',
      drive: '2WD',
      imageUrl: 'https://www.deere.co.in/assets/images/region-1/products/tractors/d-series-tractors/5050d_gearproo_large_a383269a24b7d7c0b8347df37dcd8c08514ddc30.jpg',
      description: 'Advanced 50 HP model with GearPro technology featuring 12F+4R transmission. Enhanced versatility with more gear options for different applications. Perfect for farmers seeking superior control.',
      series: 'D-Series',
      engine: '3-cylinder, 2.9L naturally aspirated diesel, 50 HP at 2100 RPM',
      transmission: '12F+4R Collarshift GearPro',
      pto: 'Standard/Dual/Reverse options - 540 @ 2100 RPM',
      hydraulics: '1600 kgf lifting capacity',
      fuelTank: 'Standard capacity',
      weight: 'Optimized for performance',
      johnDeereUrl: 'https://www.deere.co.in/en/tractors/d-series-tractors/5050d-gearpro/'
    },
    {
      model: '5045D',
      fullModelName: '5045D PowerPro',
      hp: 46,
      rearTyreSize: '14.9 x 28',
      type: 'PowerPro',
      drive: '2WD',
      imageUrl: 'https://www.deere.co.in/assets/images/images/5045D_Powerpro_Tractor_large_e1f0566e5407b9978ba52a06f713d4d642fd47b1.png',
      description: 'Power-packed 46 HP agricultural tractor with high backup torque. Features top shaft lubrication, piston spray cooling, and rear oil axle with metal face seal. Versatile and low maintenance.',
      series: 'D-Series',
      engine: '3-cylinder naturally aspirated diesel, 46 HP (34.1 kW) at 2100 RPM',
      transmission: '8F+4R Collarshift',
      pto: 'Standard/Dual/Reverse PTO options - 540 RPM',
      hydraulics: 'Category II linkage with reliable lifting',
      fuelTank: 'Standard fuel capacity',
      weight: 'Durable construction',
      johnDeereUrl: 'https://www.deere.co.in/en/tractors/d-series-tractors/5045d-tractor/'
    },
    {
      model: '5045D',
      fullModelName: '5045D GearPro',
      hp: 46,
      rearTyreSize: '14.9 x 28',
      type: 'GearPro',
      drive: '2WD',
      imageUrl: 'https://www.deere.co.in/assets/images/region-1/products/tractors/d-series-tractors/5045d-gearpro-45hp/5045d_gearpro_45hp_large_ec0d46f3640860fdfe234d30a13c7d220879ad1b.jpg',
      description: 'Enhanced 46 HP model with GearPro 12F+4R transmission offering more gear options. Suitable for small to medium farms with varied implement usage and diverse farming needs.',
      series: 'D-Series',
      engine: '3-cylinder naturally aspirated diesel, 46 HP (34.1 kW)',
      transmission: '12F+4R Collarshift GearPro',
      pto: 'Standard/Dual/Reverse - 540 RPM',
      hydraulics: 'Dependable hydraulic system',
      fuelTank: 'Optimized capacity',
      weight: 'Balanced design',
      johnDeereUrl: 'https://www.deere.co.in/en/tractors/d-series-tractors/5045d-gearpro/'
    },
    {
      model: '5042D',
      fullModelName: '5042D PowerPro',
      hp: 44,
      rearTyreSize: '14.9 x 28',
      type: 'PowerPro',
      drive: '2WD',
      imageUrl: 'https://www.deere.co.in/assets/images/images/5042D_PowerPro__Tractor_large_cb7429120cc9a1ea5c962a238471cf617084328c.png',
      description: '44 HP PowerPro model perfect for small farms and orchard work. Features all standard 5D Series benefits including top shaft lubrication and oil axle with metal face seal for durability.',
      series: 'D-Series',
      engine: '3-cylinder naturally aspirated diesel, 44 HP (32.3 kW) at 2100 RPM',
      transmission: '8F+4R Collarshift',
      pto: 'Standard/Dual/Reverse PTO - 540 RPM',
      hydraulics: 'Single/Dual clutch options available',
      fuelTank: 'Adequate for field operations',
      weight: 'Compact and efficient',
      johnDeereUrl: 'https://www.deere.co.in/en/tractors/d-series-tractors/5042d-tractor/'
    },
    {
      model: '5039D',
      fullModelName: '5039D PowerPro',
      hp: 41,
      rearTyreSize: '13.6 x 28',
      type: 'PowerPro',
      drive: '2WD',
      imageUrl: 'https://www.deere.co.in/assets/images/images/5039D_PowerPro_Tractor_large_5f95ac026d443a0bac9755a1e6374f9aea1bb9f8.png',
      description: '41 HP compact tractor ideal for diversified farming operations. Part of the reliable 5D Series with enhanced torque and productivity features.',
      series: 'D-Series',
      engine: '3-cylinder naturally aspirated diesel, 41 HP (30.8 kW) at 2100 RPM',
      transmission: '8F+4R Collarshift',
      pto: 'Standard/Dual/Reverse - 540 RPM',
      hydraulics: 'Single/Dual clutch options',
      fuelTank: 'Standard capacity',
      weight: 'Lightweight and maneuverable',
      johnDeereUrl: 'https://www.deere.co.in/en/tractors/d-series-tractors/5039d-tractor/'
    },
    {
      model: '5105',
      fullModelName: '5105',
      hp: 40,
      rearTyreSize: '13.6 x 28',
      type: 'Standard',
      drive: '2WD',
      imageUrl: 'https://www.deere.co.in/assets/images/images/5105D_Tractor_large_b73afd492c4042b91c5ec0bf958323285eb077b4.png',
      description: '40 HP reliable tractor suitable for agricultural and haulage applications. Available in both 2WD and 4WD configurations for versatility.',
      series: 'D-Series',
      engine: '3-cylinder naturally aspirated diesel, 40 HP (29.4 kW) at 2100 RPM',
      transmission: '8F+4R Collarshift',
      pto: 'Standard/Dual PTO options',
      hydraulics: 'Single/Dual clutch available',
      fuelTank: 'Standard fuel capacity',
      weight: 'Compact design',
      johnDeereUrl: 'https://www.deere.co.in/en/tractors/d-series-tractors/5105-tractor/'
    },
    {
      model: '5036D',
      fullModelName: '5036D',
      hp: 36,
      rearTyreSize: '12.4 x 28',
      type: 'Standard',
      drive: '2WD',
      imageUrl: 'https://www.deere.co.in/assets/images/tractors/d-series-tractors/5036d-tractor/5036D_tractor_large_e799c467a87f25287e1062caf83939a533f7f52f.jpg',
      description: 'Compact 36 HP entry-level tractor suited for small farms, vineyard operations, and precision farming tasks. Efficient and economical for diverse applications.',
      series: 'D-Series',
      engine: '3-cylinder naturally aspirated diesel, 36 HP (26.8 kW) at 2100 RPM',
      transmission: '8F+4R Collarshift',
      pto: 'Standard PTO',
      hydraulics: 'Single clutch system',
      fuelTank: 'Compact fuel tank',
      weight: 'Lightweight construction',
      johnDeereUrl: 'https://www.deere.co.in/en/tractors/d-series-tractors/5036d-tractor/'
    }
  ];

  let modelsAdded = 0;
  let modelsUpdated = 0;

  for (const tractor of tractorModels) {
    const { data: existing } = await supabaseClient
      .from('tractors')
      .select('id, image_url')
      .eq('model', tractor.model)
      .eq('drive', tractor.drive)
      .maybeSingle();

    if (existing) {
      const { error } = await supabaseClient
        .from('tractors')
        .update({
          full_model_name: tractor.fullModelName,
          hp: tractor.hp,
          rear_tyre_size: tractor.rearTyreSize,
          type: tractor.type,
          image_url: tractor.imageUrl,
          description: tractor.description,
          series: tractor.series,
          engine: tractor.engine,
          transmission: tractor.transmission,
          pto: tractor.pto,
          hydraulics: tractor.hydraulics,
          fuel_tank: tractor.fuelTank,
          weight: tractor.weight,
          john_deere_url: tractor.johnDeereUrl,
          last_synced_at: new Date().toISOString()
        })
        .eq('id', existing.id);

      if (!error) modelsUpdated++;
    } else {
      const { error } = await supabaseClient
        .from('tractors')
        .insert({
          model: tractor.model,
          full_model_name: tractor.fullModelName,
          hp: tractor.hp,
          rear_tyre_size: tractor.rearTyreSize,
          type: tractor.type,
          drive: tractor.drive,
          image_url: tractor.imageUrl,
          description: tractor.description,
          series: tractor.series,
          engine: tractor.engine,
          transmission: tractor.transmission,
          pto: tractor.pto,
          hydraulics: tractor.hydraulics,
          fuel_tank: tractor.fuelTank,
          weight: tractor.weight,
          is_new: true,
          john_deere_url: tractor.johnDeereUrl
        });

      if (!error) modelsAdded++;
    }
  }

  return { modelsAdded, modelsUpdated };
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey);

    const { data: logData, error: logError } = await supabaseClient
      .from('sync_logs')
      .insert({
        status: 'in_progress'
      })
      .select()
      .single();

    if (logError) throw logError;

    const { modelsAdded, modelsUpdated } = await syncTractors(supabaseClient);

    await supabaseClient
      .from('sync_logs')
      .update({
        sync_completed_at: new Date().toISOString(),
        models_added: modelsAdded,
        models_updated: modelsUpdated,
        status: 'success'
      })
      .eq('id', logData.id);

    return new Response(
      JSON.stringify({
        success: true,
        modelsAdded,
        modelsUpdated,
        message: `Sync completed: ${modelsAdded} added, ${modelsUpdated} updated`
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Sync error:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
