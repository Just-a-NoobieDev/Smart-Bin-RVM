import supabase from "@/lib/supabase-browser";

export async function PUT(request) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("value");

  const { data, error } = await supabase
    .from("capacity")
    .update({ value: query })
    .eq("id", 1)
    .select();

  if (!error) {
    return Response.json(data);
  }
  return Response.json(error);
}
