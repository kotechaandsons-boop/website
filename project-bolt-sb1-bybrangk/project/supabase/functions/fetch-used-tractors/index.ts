const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface UsedTractor {
  id: string;
  tractorName: string;
  model: string;
  year: string;
  condition: string;
  location: string;
  imageUrl: string;
  contactNumber: string;
  status: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const sheetUrl = "https://opensheet.elk.sh/1_VaTrrQ5hhPWkUjEB5sAahdx1IB1RR1ysQ99tzmJ4JQ/Sheet1";

    const response = await fetch(sheetUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    const tractors: UsedTractor[] = data.map((row: any, index: number) => ({
      id: row.id || `tractor-${index + 1}`,
      tractorName: row.tractorName || row["Tractor Name"] || "",
      model: row.model || row.Model || "",
      year: row.year || row.Year || "",
      condition: row.condition || row.Condition || "",
      location: row.location || row.Location || "",
      imageUrl: row["Image URL 2"] || row.imageUrl || row["Image URL"] || "",
      contactNumber: row.contactNumber || row["Contact Number"] || "",
      status: row.status || row.Status || "",
    }))

    return new Response(
      JSON.stringify({ tractors }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching Google Sheets data:", error);

    return new Response(
      JSON.stringify({
        error: "Failed to fetch tractor data",
        message: error instanceof Error ? error.message : "Unknown error"
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
