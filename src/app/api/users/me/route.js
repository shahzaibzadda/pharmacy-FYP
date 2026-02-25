import { getDataFromToken } from "@/lib/getDataFromToken";
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(request) {
  await dbConnect();
  const userId = getDataFromToken(request); // returns decoded token id
  const user = await User.findById(userId).select("-password");

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(
    { message: "User found", data: user },
    { status: 200 },
  );
}
