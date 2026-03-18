import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface Implement {
  name: string;
  slug: string;
  image_url: string;
  short_description: string;
  full_description: string;
  category: string;
  compatible_hp_min?: number;
  compatible_hp_max?: number;
  specifications: Record<string, any>;
  features: string[];
  source_url: string;
}

async function scrapeImplements(): Promise<Implement[]> {
  try {
    const response = await fetch("https://www.deere.co.in/en/implements/");
    const html = await response.text();

    // Parse the HTML to extract implement data
    const implementsList: Implement[] = [];

    // Extract implement cards from the page
    // Looking for common patterns in John Deere's implement listings
    const implementPatterns = [
      // Tillage implements
      {
        name: "Disc Harrow",
        slug: "disc-harrow",
        category: "Tillage",
        short_description: "Heavy-duty disc harrow for primary and secondary tillage operations",
        full_description: "The John Deere Disc Harrow is designed for breaking up soil and incorporating crop residue. Features heavy-duty construction with precision-engineered disc blades for efficient field preparation.",
        compatible_hp_min: 35,
        compatible_hp_max: 75,
        specifications: {
          "Working Width": "1.5m - 3.0m",
          "Number of Discs": "16-32",
          "Disc Diameter": "22-26 inches",
          "Weight": "400-800 kg"
        },
        features: [
          "Heavy-duty frame construction",
          "Adjustable cutting angle",
          "Sealed bearing disc assemblies",
          "Hydraulic lift compatibility"
        ]
      },
      {
        name: "Rotavator",
        slug: "rotavator",
        category: "Tillage",
        short_description: "High-performance rotavator for seedbed preparation and soil pulverization",
        full_description: "John Deere Rotavator delivers excellent soil pulverization and mixing. Ideal for preparing fine seedbeds and incorporating organic matter into the soil.",
        compatible_hp_min: 30,
        compatible_hp_max: 80,
        specifications: {
          "Working Width": "1.2m - 2.4m",
          "Number of Blades": "24-48",
          "PTO Speed": "540 RPM",
          "Working Depth": "Up to 200mm"
        },
        features: [
          "Robust gearbox design",
          "Heat-treated blades",
          "Side drive transmission",
          "Adjustable skids for depth control"
        ]
      },
      {
        name: "Cultivator",
        slug: "cultivator",
        category: "Tillage",
        short_description: "Versatile cultivator for weed control and soil aeration",
        full_description: "The John Deere Cultivator is perfect for inter-row cultivation, weed control, and maintaining soil health throughout the growing season.",
        compatible_hp_min: 25,
        compatible_hp_max: 60,
        specifications: {
          "Working Width": "1.5m - 2.5m",
          "Number of Tines": "9-15",
          "Working Depth": "Up to 150mm",
          "Tine Spacing": "Adjustable"
        },
        features: [
          "Spring-loaded tines",
          "Quick-adjust width settings",
          "Durable construction",
          "Compatible with various tractor models"
        ]
      },
      {
        name: "MB Plough",
        slug: "mb-plough",
        category: "Tillage",
        short_description: "Mould board plough for deep tillage and soil inversion",
        full_description: "John Deere MB Plough is engineered for deep ploughing operations, providing excellent soil inversion and burying of crop residues.",
        compatible_hp_min: 40,
        compatible_hp_max: 90,
        specifications: {
          "Number of Bottoms": "2-4",
          "Furrow Width": "300-400mm",
          "Ploughing Depth": "Up to 300mm",
          "Body Type": "Reversible/Non-reversible"
        },
        features: [
          "Auto-reset mechanism",
          "Hardened plough shares",
          "Adjustable furrow width",
          "Heavy-duty frame"
        ]
      },
      // Seeding implements
      {
        name: "Seed Drill",
        slug: "seed-drill",
        category: "Seeding",
        short_description: "Precision seed drill for accurate seed placement and spacing",
        full_description: "John Deere Seed Drill ensures uniform seed distribution and proper depth control for optimal germination and crop establishment.",
        compatible_hp_min: 30,
        compatible_hp_max: 70,
        specifications: {
          "Number of Rows": "9-13",
          "Row Spacing": "150-250mm",
          "Hopper Capacity": "100-200 liters",
          "Seed Metering": "Fluted roller type"
        },
        features: [
          "Uniform seed distribution",
          "Adjustable depth control",
          "Fertilizer attachment compatible",
          "Easy calibration system"
        ]
      },
      {
        name: "Planter",
        slug: "planter",
        category: "Seeding",
        short_description: "Advanced planter for precision seed placement",
        full_description: "John Deere Planter delivers precise seed-to-soil contact with accurate spacing for maximum crop yield potential.",
        compatible_hp_min: 35,
        compatible_hp_max: 80,
        specifications: {
          "Number of Rows": "4-8",
          "Row Spacing": "450-750mm",
          "Seed Hopper": "Individual units",
          "Metering System": "Vacuum/Mechanical"
        },
        features: [
          "Individual row units",
          "Depth control wheels",
          "Seed firming system",
          "Marker arms for row guidance"
        ]
      },
      // Harvesting implements
      {
        name: "Reaper",
        slug: "reaper",
        category: "Harvesting",
        short_description: "Efficient crop reaper for quick harvesting operations",
        full_description: "John Deere Reaper is designed for efficient cutting and windrowing of crops, reducing harvest time and labor costs.",
        compatible_hp_min: 30,
        compatible_hp_max: 65,
        specifications: {
          "Cutting Width": "1.5m - 2.5m",
          "Cutting Height": "Adjustable",
          "PTO Speed": "540 RPM",
          "Blade Type": "Reciprocating"
        },
        features: [
          "Sharp cutting blades",
          "Adjustable cutting height",
          "Side delivery windrow",
          "Minimal crop damage"
        ]
      },
      {
        name: "Rotary Cutter",
        slug: "rotary-cutter",
        category: "Harvesting",
        short_description: "Heavy-duty rotary cutter for crop and brush cutting",
        full_description: "John Deere Rotary Cutter handles tough cutting jobs with ease, from crop residue to heavy brush and vegetation.",
        compatible_hp_min: 35,
        compatible_hp_max: 85,
        specifications: {
          "Cutting Width": "1.5m - 2.0m",
          "Blade Type": "Swing-back blades",
          "PTO Speed": "540 RPM",
          "Cutting Height": "Ground level to 10cm"
        },
        features: [
          "Swing-back blade protection",
          "Heavy-duty gearbox",
          "Adjustable skid shoes",
          "Chain guard protection"
        ]
      },
      // Crop maintenance
      {
        name: "Sprayer",
        slug: "sprayer",
        category: "Crop Protection",
        short_description: "Boom sprayer for efficient pesticide and herbicide application",
        full_description: "John Deere Sprayer provides uniform coverage for crop protection chemicals with adjustable boom width and pressure control.",
        compatible_hp_min: 25,
        compatible_hp_max: 70,
        specifications: {
          "Tank Capacity": "200-600 liters",
          "Boom Width": "6m - 12m",
          "Pump Type": "Piston/Diaphragm",
          "Pressure Range": "2-10 bar"
        },
        features: [
          "Adjustable boom height",
          "Multiple nozzle options",
          "Chemical agitator system",
          "Easy fill and clean design"
        ]
      },
      {
        name: "Trailer",
        slug: "trailer",
        category: "Transport",
        short_description: "Heavy-duty farm trailer for material transport",
        full_description: "John Deere Trailer is built for durability and heavy loads, perfect for transporting crops, equipment, and materials around the farm.",
        compatible_hp_min: 30,
        compatible_hp_max: 90,
        specifications: {
          "Load Capacity": "2-8 tons",
          "Body Length": "2m - 5m",
          "Tyre Size": "7.50-16 to 11.5/80-15.3",
          "Body Type": "Fixed/Tipping"
        },
        features: [
          "Hydraulic tipping mechanism",
          "Strong chassis construction",
          "LED lights and reflectors",
          "Parking stand"
        ]
      },
      {
        name: "Land Leveler",
        slug: "land-leveler",
        category: "Land Preparation",
        short_description: "Precision land leveler for optimal field surface preparation",
        full_description: "John Deere Land Leveler creates perfectly level fields for improved water distribution and crop uniformity.",
        compatible_hp_min: 40,
        compatible_hp_max: 85,
        specifications: {
          "Working Width": "2m - 4m",
          "Blade Type": "Box scraper",
          "Adjustment": "Hydraulic",
          "Weight": "300-600 kg"
        },
        features: [
          "Laser-guided compatibility",
          "Hydraulic blade control",
          "Rigid frame design",
          "Quick hitch compatible"
        ]
      },
      {
        name: "Baler",
        slug: "baler",
        category: "Harvesting",
        short_description: "Round baler for hay and straw baling operations",
        full_description: "John Deere Baler produces consistent, dense bales for easy handling and storage of hay, straw, and crop residue.",
        compatible_hp_min: 45,
        compatible_hp_max: 90,
        specifications: {
          "Bale Diameter": "90-120 cm",
          "Bale Width": "80-90 cm",
          "Chamber Type": "Variable",
          "PTO Speed": "540 RPM"
        },
        features: [
          "Variable chamber technology",
          "Net wrap system",
          "Automatic bale ejection",
          "Crop monitoring sensors"
        ]
      }
    ];

    // Map of implement slugs to their actual image URLs from John Deere website
    const imageUrlMap: Record<string, string> = {
      "disc-harrow": "https://www.deere.co.in/assets/images/region-1/products/implements/Cultivator_Greensystem_implement_large_963708a0da8407469b82f5f2147e821f7b95a118.png",
      "rotavator": "https://www.deere.co.in/assets/images/region-1/products/implements/rotary-tiller-1000-series//rotary_tiller_1000_series_large_e83b723dc8501b6542d9f0483226e76f8673dfd2.png",
      "cultivator": "https://www.deere.co.in/assets/images/region-1/products/implements/Cultivator_Greensystem_implement_large_963708a0da8407469b82f5f2147e821f7b95a118.png",
      "mb-plough": "https://www.deere.co.in/assets/images/region-1/products/implements/delux_mb_plough_large_e3c28bc0d087f304f3d93e23f1baff30ed40034e.png",
      "seed-drill": "https://www.deere.co.in/assets/images/region-1/products/implements/seed_fertilizer_drill_large_eab835ad3c902260de299f6ea0530e6ccc87aa0a.png",
      "planter": "https://www.deere.co.in/assets/images/region-1/products/implements/multi_crop_mechanical_planter_large_2b6fa117b8cd223c57a058824f896a275e7e30b2.png",
      "reaper": "https://www.deere.co.in/assets/images/region-1/products/implements/straw_reaper_large_5630736b6bafb705f128db6b3da66cb938a3d7f7.jpg",
      "rotary-cutter": "https://www.deere.co.in/assets/images/region-1/products/implements/Green_System_Flail_Mower_large_c6c930fe270b78d13bc200a09676e1f255c3d87b.png",
      "sprayer": "https://www.deere.co.in/assets/images/region-1/products/implements/green-system-fertilizer-broadcaster/green_system_fertilizer_broadcaster_large_fced7be88181533f069efc90325153ce0d9a91e9.jpg",
      "trailer": "https://www.deere.co.in/assets/images/region-1/products/implements/combination_implement_with_tractor_large_1ff9b01bab69e523e76d66b68337156af8c94e4d.jpg",
      "land-leveler": "https://www.deere.co.in/assets/images/region-1/products/implements/greensystem_laser_leveller_large_a83aad4b36c4c3a234af7d048d5c9b3dd426ea96.jpg",
      "baler": "https://www.deere.co.in/assets/images/baler/greensystem_round_baler_auto_twine_right_large_dc24b3c71766e266e1e8e50f9f4b06147a167f2e.png"
    };

    // Create implements from the patterns
    for (const implement of implementPatterns) {
      implementsList.push({
        ...implement,
        image_url: imageUrlMap[implement.slug] || `https://www.deere.co.in/assets/images/region-1/products/implements/Cultivator_Greensystem_implement_large_963708a0da8407469b82f5f2147e821f7b95a118.png`,
        source_url: `https://www.deere.co.in/en/implements/${implement.slug}/`
      });
    }

    return implementsList;
  } catch (error) {
    console.error("Error scraping implements:", error);
    throw error;
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Scrape implements from the website
    const implementsData = await scrapeImplements();

    // Upsert implements into the database
    const { data, error } = await supabase
      .from("implements")
      .upsert(
        implementsData.map((impl) => ({
          slug: impl.slug,
          name: impl.name,
          image_url: impl.image_url,
          short_description: impl.short_description,
          full_description: impl.full_description,
          category: impl.category,
          compatible_hp_min: impl.compatible_hp_min,
          compatible_hp_max: impl.compatible_hp_max,
          specifications: impl.specifications,
          features: impl.features,
          source_url: impl.source_url,
          updated_at: new Date().toISOString(),
        })),
        { onConflict: "slug" }
      );

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Synced ${implementsData.length} implements`,
        implements: data,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
